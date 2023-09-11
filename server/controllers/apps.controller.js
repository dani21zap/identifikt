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

    async createApp(req, res, next) {
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

    async updateApp(req, res, next) {
        req.body.settings.cname = !req.body.own_domain ? '' : req.body.settings.cname;
        req.body.domain_id = !req.body.own_domain ? null : req.body.domain_id;
        req.body.settings.domain_url = !req.body.own_domain ? '' : req.body.settings.domain_url;

        if (req.body.settings.image && req.body.settings.image.search('https://ecartapi.s3.amazonaws.com/images/apps/') != -1){
            var match = {
                app_id: req.params.id,
                bucket_id: req.body.settings.image.split('/')[5],
            }
        }
        else {
            var match = {
                app_id: req.params.id
            }
        }
        return Apps.findOneAndUpdate(
            match
        ,{
            $set: req.body
        },{
            useFindAndModify: false,
            new: true
        }).then(app => {
            if (!app) {
                if(req.body.settings.image){
                    throw new BadRequestError("The id_bucket path not match with the image file.");
                }
                    throw new NotFoundError("The app does not exist.");
            }
            return  res.status(200).json(app);
        }).catch(err => next(err));
    }

    async updateAppDomain( req, res, next ) {
        let updateFunc = async() => {
            req.body.settings.cname = !req.body.own_domain ? '' : req.body.settings.cname;
            req.body.domain_id = !req.body.own_domain ? null : req.body.domain_id;
            req.body.settings.domain_url = !req.body.own_domain ? '' : req.body.settings.domain_url;

            if (req.body.settings.image && req.body.settings.image.search('https://ecartapi.s3.amazonaws.com/images/apps/') != -1){
                var match = {
                    app_id: req.params.id,
                    bucket_id: req.body.settings.image.split('/')[5],
                }
            }
            else {
                var match = {
                    app_id: req.params.id
                }
            }
            return Apps.findOneAndUpdate(
                match
            ,{
                $set: req.body
            },{
                useFindAndModify: false,
                new: true
            }).then(app => {
                if (!app) {
                    if(req.body.settings.image){
                        throw new BadRequestError("The id_bucket path not match with the image file.");
                    }
                        throw new NotFoundError("The app does not exist.");
                }
                return  res.status(200).json(app);
            }).catch(err => { next(err) });
        };
        if ((req.body.settings.domain_url || req.body.settings.domain_url == '') && req.query.updateDomain == 'true') {
            if (req.body.domain_id) {
                try {
                    // let res = await axios.get(`https://api.heroku.com/apps/${process.env.HEROKU_ENDPOINT}/domains/${req.body.domain_id}`, {
                    //     headers: {
                    //         accept: 'application/vnd.heroku+json; version=3',
                    //         authorization: 'Bearer ' + process.env.HEROKU_TOKEN
                    //     }
                    // });
                    await axios.delete(`https://api.heroku.com/apps/${process.env.HEROKU_ENDPOINT}/domains/${req.body.domain_id}`, {
                        headers: {
                            accept: 'application/vnd.heroku+json; version=3',
                            authorization: 'Bearer ' + process.env.HEROKU_TOKEN
                        }
                    });
                    // .then(res => res)
                    // .catch(err => err);
                } catch (err) {
                    return res.status(418).json("An error ocurred please try again with a different domain.")
                }
            }
            if (req.body.own_domain) {
                try {
                    let res = await axios.post(`https://api.heroku.com/apps/${process.env.HEROKU_ENDPOINT}/domains`, {
                        hostname:req.body.settings.domain_url,
                        "sni_endpoint": null
                    }, {
                        headers: {
                            accept: 'application/vnd.heroku+json; version=3',
                            authorization: 'Bearer ' + process.env.HEROKU_TOKEN,
                            'content-type':'application/json',
                            'accept-encoding':'gzip, deflate, br'
                        }
                    })
                    req.body.settings.cname = res.data.cname;
                    req.body.domain_id = res.data.id;
                    return updateFunc();
                } catch (err) {
                    req.body.own_domain = false;
                    return res.status(418).json("An error ocurred please try again with a different domain.");
                }
            }
            return res.status(200).json("No update");
        } else if ((req.body.settings.domain_url || req.body.settings.domain_url == '') && req.query.deleteDomain && req.query.deleteDomain == 'true') {
            if (req.body.domain_id) {
                try {
                    await axios.delete(`https://api.heroku.com/apps/${process.env.HEROKU_ENDPOINT}/domains/${req.body.domain_id}`, {
                        headers: {
                            accept: 'application/vnd.heroku+json; version=3',
                            authorization: 'Bearer ' + process.env.HEROKU_TOKEN
                        }
                    });
                    req.body.own_domain = false;
                    req.body.settings.domain_url = '';
                    req.body.settings.cname = '';
                    req.body.domain_id = null;
                } catch (err) {
                    return res.status(418).json("An error ocurred on deleting your domain contact support.");
                }

            }
            return updateFunc();
        }
    }

    updateAppEcommerce(req, res, next){
        if(!req.body.ecommerce || req.body.active == undefined) {
            return res.status(400).json("Request JSON invalid")
        }
        let id_ecommerce = mongoose.Types.ObjectId(req.body.ecommerce)
        let match = {
            "app_id": req.params.id,
            "user_id":req.user.id
        }
        let action = (req.body.active === true) ? { $addToSet: {"ecommerces":id_ecommerce} } : { $pull: {"ecommerces":id_ecommerce} }
        let options =  {
                new: true,
                projection:{
                    _id: "$_id",
                    app_id: "$app_id",
                    ecommerces: "$ecommerces"
               }
        }
        return Apps.updateOne(
            match,
            action,
            options
        )
        .then(status => {
            return res.status(200).json(status)
        })
        .catch(err => next(err))
    }

    updateAppKeysAndScopes(req, res, next){
        return Apps.find({
            app_id: req.params.id
        }).then( app => {
            if( !app || app.length == 0 ) {
                throw new NotFoundError("The app does not exist.");
            }
            Object.assign(app[0].oauth,req.body)
            return Apps.updateOne({
                app_id: req.params.id
            }, {
                $set: {
                    oauth :  app[0].oauth
                }
            }, {
                new: true
            } )
            .then(app => {
                if (!app) {
                  throw new NotFoundError("The app does not exist.");
                }
               return res.status(200).json(app);
            } ).catch(err => next(err));
        } )
        .catch(err => next(err))
    }

    deleteAppKeysAndScopes(req, res, next){
        return Apps.find({
            app_id: req.params.id
        }).then( app => {
            if( !app || app.length == 0 ) {
                throw new NotFoundError("The app does not exist.");
            }

            if (app[0].oauth[req.params.ecommerce]) {
                delete app[0].oauth[req.params.ecommerce];
            }
            return Apps.updateOne({
                app_id: req.params.id
            }, {
                $set: {
                    oauth :  app[0].oauth
                }
            }, {
                new: true
            } )
            .then(app => {
                if (!app) {
                  throw new NotFoundError("The app does not exist.");
                }
               return res.status(200).json(app);
            } ).catch(err => next(err));
        } )
        .catch(err => next(err))
    }

    listApps(req, res, next) {
        if(req.user){
            var match = {
                user_id: mongoose.Types.ObjectId(req.user.id),
                deleted: false,
            }
        } else {
            var match = {
                deleted: false,
            }
        }
        var limit = parseInt(req.query.limit) || 10 ;
        var page = parseInt(req.query.page) || 1 ;
        var query = req.query.q || '' ;

        if (typeof req.query.published !== 'undefined') {
            match.published = req.query.published === 'true';
        }

        Apps.aggregate([
            { $match: match },
            { $sort: {
                'name': 1
            } },
            { $addFields: {
                q: {
                    $concat: [{
                        $ifNull: ['$name', '']
                    }]
                }
            } },
            { $match: {
                q:  new RegExp(req.query.q,'i')
            } },
            { $facet: {
                count: [
                    { $count: 'count' }
                ],
                docs: [
                    { $skip: (page * limit) - limit },
                    { $limit:  limit },
                    { $project: {
                        // q:"$q",
                        name: '$name',
                        active: '$active',
                        app_id: '$app_id',
                        month_requests: { $ifNull: ['$month_requests', 0] },
                        accesses: { $ifNull: ['$accesses', 0] },
                        published: '$published',
                        created_at: '$created_at',
                        updated_at: '$updated_at'
                    } },
                    {
                        $sort:{
                            month_requests:-1
                        }
                    }
                ]
            } },
            { $addFields: {
                count: { $first: '$count' }
            } },
            { $project: {
                count: '$count.count',
                pages: { $ceil: { $divide: ['$count.count',limit] } },
                docs: '$docs'
            } }
        ])
        .then(docs => {
            return res.status(200).json(docs[0]);
        })
        .catch(err => next(err))
    }

    infoApp(req, res, next) {
            return Apps.aggregate([
            {   $match: {
                app_id: req.params.id,
                user_id: mongoose.Types.ObjectId(req.user.id),
                deleted: false
            } },
            {
            $lookup:{
                from: "ecommerces",
                localField: "ecommerces",
                foreignField: "_id",
                as: "ecommerces"
             }}
        ])
        .then(app => {
            if (!app || app.length == 0) {
                // throw Boom.notFound('The app does not exist.');
                throw new NotFoundError("The app does not exist.");
            }
            return res.status(200).json(app[0]);
        })
        .catch(err => next(err));
    }

    deleteApp(req, res, next) {

        return Apps.findOne({
            app_id: req.params.id,
            user_id: mongoose.Types.ObjectId(req.user.id)
        })
        .then(app =>{
            if (!app) {
                 throw new NotFoundError("The app does not exist.");
            }
            return Accesses.countDocuments({
               app_id: app._id
            })
            .then(accesses =>{
                if(accesses > 0){
                    return Apps.findByIdAndUpdate({
                        "_id":mongoose.Types.ObjectId(app._id)
                    }, [ {
                       $set: { deleted: true , active: false }
                    } ],
                    {
                        new: true,
                        access: true
                    })
                    .then(deleted =>{
                        if(!deleted){
                            throw new ConflictError("Error, the app could not be removed")
                        }
                        return res.status(200).json({
                            code: 200,
                            success: true,
                            message:"Success! App has been deleted"
                        })
                    })
                    .catch(err => next(err))
                }else{
                    return Apps.deleteOne({
                        "_id":mongoose.Types.ObjectId(app._id)
                    }).
                    then(deleted => {
                        return res.status(200).json({
                            code: 200,
                            success: true,
                            message:"Success! App has been deleted"
                        })
                    }).catch(
                        err => next(err)
                    )
                }
            })
            .catch(err =>  err => next(err))
        })
        .catch(err => next(err));
    }

     listStores(req, res, next) {
        var limit = parseInt(req.query.limit) || 10 ;
        var page = parseInt(req.query.page) || 1 ;
        var query = req.query.q || '' ;
        if(!req.query.q){
           req.query.q = ''
        }
        return Apps.aggregate([
            {
             $addFields: {
                deleted: { $ifNull: ['$deleted', false] }
            }
        },
            { $match: {
                user_id: mongoose.Types.ObjectId(req.user.id),
                deleted: false,
                app_id: req.query.app_id || {$exists: true}
            } },
            { $lookup: {
                from: 'accesses',
                localField: '_id',
                foreignField: 'app_id',
                as: 'accesses'
            } },
            { $unwind: '$accesses' },
            { $sort: {
                'accesses.created_at': -1
            } },
            { $addFields: {
                q: {
                    $concat: [ {
                        $ifNull: ['$accesses.access.name', '']
                    }, {
                        $ifNull: ['$accesses.access.url','']
                    } ]
                },
                "accesses.deleted": {
                    $ifNull: ['$accesses.deleted', false]
                }
            } },
            { $match: {
                'accesses.deleted': false,
                q: new RegExp(req.query.q,'i')
            } },
            { $facet: {
                count: [
                    { $count: 'count' }
                ],
                docs: [
                    { $skip: (page * limit) - limit },
                    { $limit:  limit },
                    { $project: {
                        // q:"$q",
                        _id: '$accesses._id',
                        name: '$accesses.access.name',
                        url: '$accesses.access.url',
                        ecommerce: '$accesses.access.ecommerce',
                        requests: '$accesses.requests',
                        active: '$accesses.active'
                    } }
                ]
            } },
            { $addFields: {
                count: { $first: '$count' }
            } },
            { $project: {
                count: '$count.count',
                docs: '$docs',
                pages: { $ceil: { $divide: ['$count.count', limit ] } }
            } }
        ]).then(response => {
            return res.status(200).json(response[0])
        })
        .   catch(err => next(err)
        )

    }

    infoStore(req, res, next) {
       // if (!mongoose.Types.ObjectId.isValid(req.params.appId)) {
       //      // throw Boom.notFound('The access does not exist.');
       //        res.status(400).json("The access does not exist.");
       //  }
        return Accesses.aggregate([
            {
                $match: { _id: mongoose.Types.ObjectId(req.params.id) }
            }, {
                $lookup: {
                    from: 'ecommerces',
                    localField: 'access.ecommerce',
                    foreignField: 'name',
                    as: 'ecommerce'
                }
            }, {
                $project: {
                    store:{
                        _id: '$_id',
                        app_id: '$app_id',
                        active: '$active',
                        access_token: '$access_token',
                        access: '$access',
                        requests: { $ifNull: ['$requests', 0] },
                        ecartapi: '$ecartapi',
                        created_at: '$created_at',
                        updated_at: '$updated_at',
                        error: '$error'
                    },
                    ecommerce: {"$arrayElemAt":['$ecommerce',0]}
                }
            },{
                $sort: { name: 1 }
            }
        ])
        .then(access => {
            if (!access) {
                throw new NotFoundError("The store does not exist.");
            }
                return res.status(200).json(access[0])
        })
        .catch(err => next(err))
    }


    updateStore(req, res, next) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                  // throw Boom.notFound('The access does not exist.');
                return  res.status(404).json("The access does not exist")
        }
        ['ecommerce', 'url', 'name'].forEach(attr => {
            if (req.body[attr]) {
               throw new BadRequestError(`The ${attr} attribute is not allowed.`);
            }
        });
        return Accesses.findOne({
            _id: req.params.id
        })
        .then(resp_find => {
            if (!resp_find) {
                throw new NotFoundError("The store does not exist.");
            }

            let errors = [];
             Object.keys(req.body).forEach(attr => {
                if(attr != "active"){
                    if (!resp_find.access[attr]) {
                        errors.push(attr)
                    }
                    resp_find.access[attr] = req.body[attr];
                }

            });
                if(errors.length > 0){
                    throw new BadRequestError(`The ${errors[0]} attribute is not allowed.`);
                }

            return Accesses.findByIdAndUpdate(resp_find._id, {
                $set: {
                        active: req.body.active,
                        access: resp_find.access}
            }, {
                new: true,
                access: true
            })
            .then(async resp_update => {

                if(resp_update.active && typeof req.body.active === 'undefined'){
                    let test = await axios.get(`${process.env.ECARTAPI_URL}/api/v2/test`, {
                        headers: {
                            authorization: resp_update.access_token
                        }
                    });
                    delete resp_update.error;
                    if (!test.data.success) {
                        resp_update.error = true;
                    }
                }
                return res.status(200).json({
                    success: true,
                    store: resp_update
                });
            })
            .catch(err => {
                if(err.response.status === 503){

                    res.status(400).json({
                        success: true,
                        store: "store updated but error in api test"
                    });
                }
            })
        })
        .catch(err => next(err))
    }

    deleteStore(req, res, next) {
        return Accesses.findOne( { 
                "_id":mongoose.Types.ObjectId( req.params.id ) 
            }, {
                "access_token":1
            } )
            .then( async store => {
                let deleteStore = await axios.delete( `${process.env.ECARTAPI_URL}/api/v2/services/access/delete` , { 
                    headers: { 
                        Authorization: store.access_token 
                    }
                } );
                if( !deleteStore.data.success ){
                    throw new BadRequestError("The store does not exist.")
                }
                return res.status(200).json({
                    code: 200,
                    success: true,
                    message:"Success! Store has been deleted"
                })
            })
            .catch(err => next(err))
    }
}
module.exports = new AppsController();
