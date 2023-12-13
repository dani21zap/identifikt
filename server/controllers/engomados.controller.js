'use strict';
const mongoose = require('mongoose');
const axios = require('axios');
const Promise = require('bluebird');
const Apps = require('../models/apps.model');
const Accesses = require('../models/accesses.model');
const AccessesRequests = require('../models/accessesrequests.model');
const Ecommerces = require('../models/ecommerces.model');
const Shops = require('../models/shops.model');
const Countries = require('../models/countries.model');
const Webhooks = require('../models/webhooks.model');
const AWSUtil = require('../utils/awsS3.util')
const fs =  require('fs');
const schema = new mongoose.Schema({
    deleted: {
        type: Boolean
    },
});
const ServiceCarriers = mongoose.model('services_carriers', schema);
const ServiceFulfillments = mongoose.model('services_fulfillments', schema);

const ExcelJS = require('exceljs');

const mysql = require('mysql2/promise');

class AppsController{

    async uploadImg(req, res, next){
        try{
            if(req.file === undefined ){
                throw new BadRequestError('The image file not exists')
            }
            const uploadFile =  fs.readFileSync(req.file.path);
            let app_id = req.params.id;
            let bucket_id = null;
            if( app_id ) {
                var action = await Apps.findOne( {
                    app_id : app_id
                }, {
                    'settings.image':1,
                    'bucket_id':1
                } )
                .then( async app => {
                    bucket_id = app.bucket_id
                    if(app.bucket_id != '' && (app.settings.image && app.settings.image != '')){
                        if(app.settings.image.includes('https://ecartapi.s3.amazonaws.com/')){
                            let cut = 'https://ecartapi.s3.amazonaws.com/'.length
                            let bucketObject = app.settings.image.slice(cut)
                            await AWSUtil.delete(bucketObject)
                        }
                    }else{
                        // validation to update old apps without amazon bucket image
                        if(bucket_id == ''){
                            bucket_id = Date.now() + Math.floor( Math.random() * 100 );
                            Apps.updateOne( {
                                app_id : String(app_id)
                            }, {
                                $set : {
                                    'bucket_id' : String(bucket_id)
                                }
                            },{
                                new: true
                            } )
                           .then(response => {
                                if(!response){
                                    throw new NotFoundError("The app does not exist.");
                                }
                            }).catch(err => next(err))
                        }
                    }
                     return AWSUtil.upload(uploadFile, `images/apps/${bucket_id}/${Date.now()+'-'+req.file.originalname}`, req.file.mimetype)
                } )
                .catch( err => next(err) )
            }
            else {
                bucket_id = Date.now() + Math.floor(Math.random() * 100)
                var action = AWSUtil.upload(uploadFile, `images/apps/${bucket_id}/${Date.now()+'-'+req.file.originalname}`, req.file.mimetype)
            }
            await Promise.all([action])
             .then(response => {
                res.status(200).json(response[0])
            }).catch(err => next(err))
        } catch(err){
            next(err)
        }
    }

    async uploadCsv(req, res, next) {
        try {
            let recordsInserted = 0;

            const dbStream = new Transform({
                transform(chunk, encoding, callback) {
                    // Insert data into the database
                    const query = 'INSERT INTO engomados (active, first_name, last_name, plate, img_owner, img_car, img_card, car_model, car_brand, car_line, car_type, car_serial_number, expedition_at, expires_at) VALUES ?';

                    DB_pool.query(query, [chunk], (err) => {
                        if (err) {
                            console.error('Error inserting data into the database:', err);
                        } else {
                            recordsInserted += chunk.length;
                        }
                        callback();
                    });
                },
            });

            const results = [];

            fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', (data) => {
                let images = ['img_owner', 'img_car', 'img_card'];
                
                images.forEach(attr => {
                    let imageFileName = `${attr}_${req.query.id}.png`;

                    if (data[attr]) {
                        // Save the image to the 'public/images' folder as a static asset
                        let imagePath = path.join('client/static/assets/img', imageFileName);

                        // Convert base64 image data to a file
                        base64Img.img(data[attr], 'client/static/assets/img', imageFileName, (err) => {
                            if (err) {
                                console.error('Error saving the image:', err);
                            }
                        });
                        data[attr] = imagePath;
                    }
                });

                const record = [
                  1,   //active
                  data.first_name,   //first_name
                  data.last_name,   //last_name
                  data.plate, //plate number
                  data.img_owner || '/images/saeiv.png',   //img_owner
                  data.img_car || '/images/saeiv.png',   //img_car
                  data.img_card || '',   //img_card
                  data.car_model || '',   //car_model
                  data.car_brand || '',   //car_brand
                  data.car_line || '',   //car_line
                  data.car_type || '',   //car_type
                  data.car_serial_number || '',   //car_serial_number
                  data.expedition_at || '',   //expedition_at
                  data.expires_at || '',   //expires_at
                  ];
                console.log('record',record);
                results.push(record);

                if (results.length >= 50) {
              // Flush to the database every 50 records (adjust as needed)
                  dbStream.push(results);
                  results.length = 0;
                }
            })
            .on('end', () => {
            // Handle any remaining records
                if (results.length > 0) {
                  dbStream.push(results);
              }
              dbStream.end();
              dbStream.on('finish', () => {
                  res.status(200).send(`File uploaded successfully. ${recordsInserted} records inserted.`);
              });
            });
        } catch (error) {
            console.error('Error processing file:', error);
            res.status(500).send('Error uploading file.');
        }
    }

    async uploadExcel(req, res, next) {
        try {
            let recordsInserted = 0;

            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.readFile(req.file.path);
            const worksheet = workbook.getWorksheet('Engomados');

            const dbStream = new Transform({
                transform(chunk, encoding, callback) {
                // Insert data into the database
                    const query = 'INSERT INTO engomados (active, first_name, last_name, plate, img_owner, img_car, img_card, car_model, car_brand, car_line, car_type, car_serial_number, expedition_at, expires_at) VALUES ?';

                    DB_pool.query(query, [chunk], (err) => {
                        if (err) {
                            console.error('Error inserting data into the database:', err);
                        } else {
                            recordsInserted += chunk.length;
                        }
                        callback();
                    });
                },
            });

            const results = [];

            worksheet.eachRow((row, rowNumber) => {
                if (rowNumber === 1) {
                // Skip header row
                    return;
                }

                let record = {
                    active: row.getCell('active').value,
                    first_name: row.getCell('first_name').value,
                    last_name: row.getCell('last_name').value,
                    plate: row.getCell('plate').value,
                    img_owner: row.getCell('img_owner').value || '/images/saeiv.png',
                    img_car: row.getCell('img_car').value || '/images/saeiv.png',
                    img_card: row.getCell('img_card').value || '',
                    car_model: row.getCell('car_model').value || '',
                    car_brand: row.getCell('car_brand').value || '',
                    car_line: row.getCell('car_line').value || '',
                    car_type: row.getCell('car_type').value || '',
                    car_serial_number: row.getCell('car_serial_number').value || '',
                    expedition_at: row.getCell('expedition_at').value || '',
                    expires_at: row.getCell('expires_at').value || '',
                };

                results.push(Object.values(record));

                if (results.length >= 50) {
                // Flush to the database every 50 records (adjust as needed)
                    dbStream.push(results);
                    results.length = 0;
                }
            });

        // Handle any remaining records
            if (results.length > 0) {
                dbStream.push(results);
            }

            dbStream.end();
            dbStream.on('finish', () => {
                res.status(200).send(`File uploaded successfully. ${recordsInserted} records inserted.`);
            });
        } catch (error) {
            console.error('Error processing file:', error);
            res.status(500).send('Error uploading file.');
        }
    }

    async createEngomado(req, res, next) {
        if(req.body.file && req.body.file != ''){
            let validUrl = req.body.file.search('https://ecartapi.s3.amazonaws.com/images/apps/')
            if (validUrl != -1){
                req.body.bucket_id = req.body.file.split('/')[5]
            }
            else {
                throw new BadRequestError('The url of image is invalid')
            }
        }
        else{
            req.body.bucket_id = Date.now() + Math.floor(Math.random() * 100)
        }
        req.body.user_id = req.user.id;
        let app = req.body;
        app.settings = {
            "app_url":req.body.url || '',
            "redirect_url":req.body.redirect || '',
            "image":req.body.file || '',
            "domain_url":req.body.domain_url || '',
            "cname":''
        };
        app.ecommerces = await Ecommerces.aggregate([
            { $match: {
                active: true,
                required_app_keys: false
            } },
            { $group: {
                _id: null,
                ecommerce_ids: { $push: '$_id' }
            } }
        ])
        .then(docs => docs[0].ecommerce_ids)
        .catch(err => []);
        Apps.create(app)
        .then(doc => res.json(doc))
        .catch(err => next(err));
    }

    listEngomados(req, res, next) {
        if(req.user){
            var match = {
                user_id: mongoose.Types.ObjectId(req.user.id),
                deleted: false,
            };
        } else {
            var match = {
                deleted: false,
            };
        }
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * limit;
        const expired = req.query.expired ? req.query.expired === 'true' : false;
        const query = req.query.q || '';

        return DB_pool.query(
            `
            SELECT * FROM engomados
            WHERE
                (plate_id LIKE ? OR owner_name LIKE ? OR owner_lastname LIKE ? OR car_serial_number LIKE ?)
                ${expired ? 'AND expires_at < NOW()' : ''}
            ORDER BY expires_at DESC
            LIMIT ? OFFSET ?;
            `, 
            [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`, limit, offset])
          .then(([rows, fields]) => {
            return res.status(200).json(rows);
          })
          .catch(err => next(err));
    }

    infoEngomado(req, res, next) {
        console.log('infoEngomado');
        console.log(req.params);
        console.log(req.user);
        const is_admin = req.user.admin && req.user.read;
        const plate_id = String(req.params.id);
        // const offset = (page - 1) * limit;
        // const query = req.query.q || '';

        return DB_pool.query('SELECT * FROM engomados WHERE plate_id = ?;', 
            [plate_id])
          .then(([rows, fields]) => {
            const placas = rows[0];
            if(!is_admin && String(req.user.id) !== plate_id){
                console.log('nooo perro por aqui no')
                // throw Boom.UnauthorizedError('La información de validación de identidad no coincide con la placa solicitada vuelva a intentarlo');
                // hay pedo
                // placas no hacen match no hay repuesta
            }
            // rows[0].expedition_at = String(rows[0].expedition_at).substring(0, 10);
            // rows[0].expires_at = String(rows[0].expires_at).substring(0, 10);
            return res.status(200).json(rows[0]);
          })
          .catch(err => next(err));
    }
}
module.exports = new AppsController();
