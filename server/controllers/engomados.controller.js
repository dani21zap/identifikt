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
    };

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
