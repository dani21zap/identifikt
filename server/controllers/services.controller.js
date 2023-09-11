'use strict'
const mongoose = require('mongoose');

const EcommercesDb = require('../models/ecommerces.model');
const Countries = require('../models/countries.model');
const Mail = require('../vendor/mail/mail');
const Apps = require('../models/apps.model');
const Docs = require('../models/docs.model');
const Users = require('../models/users.model');

const AWSUtil = require('../utils/awsS3.util')
const fs =  require('fs');

class ServicesController {

    ecommerces(req, res, next) {
		EcommercesDb.aggregate([ {
	    	$match : {
	    	name:  new RegExp(req.query.name,'i') || { $exists: true },
	        active:true
	        }
	    },{
         	$unwind: "$resources"
        },{
			$group: { 
	            _id: "$_id",
	            required_app_keys: { "$first": "$required_app_keys" },
	            resourcesCount: {               
	                $sum: { 
	                    $size: "$resources.available"
	                }  
	            },
	            code: {"$first": "$code"},
	            name: {"$first": "$name"},
	            type: {"$first": "$type"},
	            image: {"$first": "$image"},
	            webhooks: {"$first": "$webhooks"},
	            oauth_pattern: {"$first": "$oauth_pattern"},
	            scopes: {"$first": "$scopes"},
	            redirect_url: {"$first": "$redirect_url"},
	            landing_type: {"$first": "$landing_type"},
	            resources: {$push:"$resources"},
	            order: {$first: "$order"},
	            guideURL: {$first: "$guideURL"}
			}
		},{
	        $sort: { order :1}
		},
		{
	    	$project: {
				_id: "$_id",
				code: "$code",
				name: "$name",
				type: "$type",
				image: "$image",
		        webhooks: "$webhooks",
		        oauth_pattern: "$oauth_pattern",
		        scopes: "$scopes",
		        redirect_url: "$redirect_url",
				landing_type: "$landing_type",
				resourcesCount: "$resourcesCount",
				resources: "$resources",
				required_app_keys: "$required_app_keys",
				guideURL: "$guideURL"
	    	}
	    }
		])
		.then(data => {
			if(data.length == 0) {
				return res.status(404).json("Ecommerce not found")
			}
			return res.status(200).json( data || [])
		})
		.catch(err => {
			next(err)});
    }

    resources(req, res, next){
		EcommercesDb.aggregate([ 
			{
		    	$match : {
			    	name: new RegExp(req.query.name,'i') || { $exists: true },
			        active: true
		        }
		    }, {
	           	$lookup: {
	                from: "resources",
	                localField: "resources.name",
	                foreignField: "name",
	                as: "complement"
	           	}
	        },	{
                $unwind:"$complement"
            },	{
                $unwind:"$resources"
            },	{
                $redact: {
                    $cond: [
                		{
                            $eq: [
                               	"$resources.name",
                               	"$complement.name"
                            ]
                      	},
                      	"$$KEEP",
                      	"$$PRUNE"
                    ]
                }
            },	{
                $project: {
                     _id: "$_id",
                    // code: "$code",
                    name: "$name",
                    type: "$type",
                    image: "$image",
                    url_reference: "$url_reference",
                    webhooks: "$webhooks",
                    // oauth_pattern: "$oauth_pattern",
                    scopes: "$scopes",
                    // redirect_url: "$redirect_url",
                    // landing_type: "$landing_type",
                    description : "$description",
                    order: "$order",
                    resources: {
                        name: "$resources.name",
                        available: "$resources.available",
                        complement: { 
                            name:"$complement.name",
                            title:"$complement.title.origin",
                            description:"$complement.description",
                            all:"$complement.all",
                            single:"$complement.single",
                            count:"$complement.count",
                            create:"$complement.create",
                            update:"$complement.update",
                            "delete":"$complement.delete",
                            complete: "$complement.complete",
                            cancel: "$complement.cancel",
                            icon_b:"$complement.icon_b",
                            icon_c:"$complement.icon_c",
                            description:"$complement.description"
                        }
                    }
                }
          	},	{
              	$group: {
                    _id: {
                        _id: "$_id",
                        // code: "$code",
                        name: "$name",
                        url_reference: "$url_reference",
                        // type: "$type",
                        image: "$image",
                        webhooks: "$webhooks",
                        // oauth_pattern: "$oauth_pattern",
                        scopes: "$scopes",
                        description: "$description",
                        order: "$order"
                        // redirect_url: "$redirect_url",
                        // landing_type: "$landing_type",
                   	},
                    resources: {
                    	$push: "$resources" 
                    },
    	            resourcesCount: {               
		                $sum: { 
		                    $size: "$resources.available"
		                }  
		            },
           		}
      		}, 	{
                	$sort : { "_id.order": 1 } 
	        }, {
	            $project: {
            	    _id: "$_id._id",
	                // code: "$_id.code",
	                name: "$_id.name",
	                // type: "$_id.type",
                    url_reference: "$_id.url_reference",
	                image: "$_id.image",
	                webhooks: "$_id.webhooks",
	                // oauth_pattern: "$_id.oauth_pattern",
	                scopes: "$_id.scopes",
	                description: "$_id.description",
	                // redirect_url: "$_id.redirect_url",
	                // landing_type: "$_id.landing_type",
	                resourcesCount: "$resourcesCount",
	                resources: "$resources",
	            }
 			}
		])
		.then ( resources => {
			resources.map( ecommerce => { 
				return ecommerce.resources.sort((a,b) => { 
					if( a.available.length > b.available.length ) { return -1}}) 
			});
			res.status( 200 ).json( resources )
		})
		.catch( err => next(err))
    }

    countries(req, res, next){
	    return Countries.find().sort({name:1})
	   .then( countries => {
	   		if(!countries || countries.length == 0) {
	   			return res.status(404).json("Countries not found")
	   		}
	   		return res.status(200).json(countries)
	   } )
	   .catch(err => next(err))
    }

    async newsletters(req, res, next){
    	let match = { 
        	active: true,
        	month_requests: {
        		$gt:0
        	}
        };
    	if (req.query) {
    		if (req.query.user_id) {
    			match._id = mongoose.Types.ObjectId(req.query.user_id);
    		}
    	}
	    Users.find(match).then(response =>{
		 	if (response.length == 0) {
		 		throw new NotFoundError("Docs not found");
		 	}
	    	let data = response.map(user=>{
		    	return new Mail(res).news(req.body, user.email, user)
	    	})
	    		return res.json({
					success: true,
					data: response.data
				});

		 })
		 .catch(err => next(err))
    }

    async uploadImg(req, res, next){
        try{
            if(req.file === undefined ){
                throw new BadRequestError('The file does not exist')
            }
            let path = {
                integration: 'images/integrations',
                manuals: 'documents/manuals'
            }
            const uploadFile =  fs.readFileSync(req.file.path);
            var action = AWSUtil.upload(uploadFile, `${path[req.params.type]}/`+req.file.originalname, req.file.mimetype)
            await Promise.all([action])
             .then(response => {
                res.status(200).json(response[0])
            }).catch(err => next(err))
        } catch(err){
            return next(err);
        }
    }

    async docs(req, res, next){
        return await Docs.findOne({ _id: mongoose.Types.ObjectId(req.params.location) })
        .then( response => {
           if (!response) {
               return res.status(404).json("Docs not found");
           }
           return res.status(200).json(response);
        })
        .catch(err => next(err))
    }
}

module.exports = new ServicesController();
