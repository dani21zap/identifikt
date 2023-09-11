'use strict';
const mongoose = require('mongoose');
const Webhooks = require('../models/webhooks.model');
const axios = require('axios');
const Promise = require('bluebird');
const Accesses = require('../models/accesses.model');

class webhooksController{

	getAllWebhook(req, res, next){
        		
		Accesses.aggregate([{
            $lookup:{ 
                from:"webhooks",
                localField: "access_token",
                foreignField: "shop_key",
                as: "webhooks"
            }
        },{
            $unwind:"$webhooks"
        },{
        	$match:{ 
                _id :  mongoose.Types.ObjectId(req.query.store_id),
                "webhooks.deleted" : false
        	}
        },{
            $replaceRoot:{ newRoot: "$webhooks" }
        } ] )
		.then(response => res.status(200).json({
			"success": true,
			"webhooks" : response
		}))
		.catch(err => next(err))
	}

	getOneWebhook(req, res, next){
		Accesses.aggregate([{
            $lookup:{ 
                from:"webhooks",
                localField: "access_token",
                foreignField: "shop_key",
                as: "webhooks"
            }
	        },{
	            $unwind : "$webhooks"
	            }
	        ,{
	        	$match:{ 
	        		_id :  mongoose.Types.ObjectId(req.query.store_id),
	               "webhooks._id" : mongoose.Types.ObjectId(req.query.wh),
	               "webhooks.deleted": false
	        	}
	        },{
	            $replaceRoot:{ newRoot: "$webhooks" }
	        }
        ])
		.then(response => res.json(response) )
		.catch(err => next(err) )
	}

	createWebhooks(req, res, next){
		let body = {
			"webhook":{
				"resource": req.body.resource,
				"action": req.body.action,
				"url": req.body.url
			}
		}
		Accesses.findOne({
			 _id: req.body.store_id 
		})
		.then(doc => { 	
			if(!doc){
				throw new NotFoundError("Stores does not exist")
			}					
			return axios.post(`${process.env.ECARTAPI_URL}/api/v2/webhooks`, body,{
				headers: {
	    			authorization: doc.access_token
	    		}
	  		} )
			.then(response => res.status(200).json(response.data.webhook))
			.catch(err => { throw err })	
		} )
		.catch(err => next(err))
	
	}
 	async createMultiWebhooks(req, res, next){
		let create = (body, id) => 
			Accesses.findOne({
				_id: id 
			})
			.then( doc => { 	
			if(!doc){
				throw new NotFoundError("Stores does not exist")
			}			
				return axios.post(`${process.env.ECARTAPI_URL}/api/v2/webhooks`, body,{
					headers: {
		    			authorization: doc.access_token
		    		}
			  	} ) 
				.then(response =>{ 
					return response.data
				})
				.catch(err => { 
					if(err){
						return new ConflictError("Api error unauthorized")
					}
				})	
			} )
			.catch(err => next(err))

		let webhooks_created = req.body.map(attr => {
			let id = attr.store_id;
			let body = {
				"webhook":{
					"resource": attr.resource,
					"action": attr.action,
					"url": attr.url
				}
			};
			return create(body, id)
			// .then(webhook => webhook)
			// .catch(err => next(err))
		})		
		
		await Promise.all(webhooks_created)
		.then(created => res.status(200).json(created))
		.catch(err => next(err))
	
	}


	updateWebhooks(req, res, next){
		let body = {
			"webhook":{
				"active": req.body.active
			}
		}
		Accesses.findOne({ _id: req.body.store_id })
		.then(doc => { 			
			return axios.put(`${process.env.ECARTAPI_URL}/api/v2/webhooks/${req.params.id}`, body,{
				headers: {
	    			authorization: doc.access_token
	    		}
	  		})
			.then(response => res.json(response.data.webhook))
			.catch(err => { throw err })	
		})
		.catch(err => next(err))
	}

	deleteWebhook(req, res, next){
		Accesses.findOne({ _id: req.query.store_id })
		.then(doc => { 			
			return axios.delete(`${process.env.ECARTAPI_URL}/api/v2/webhooks/${req.query.wh}`,{
				headers: {
	    			authorization: doc.access_token
	    		}
	  		})
			.then(response => res.status(200).json(response.data))
			.catch(err => { throw err })	
		})
		.catch(err => next(err))	
	}

}
module.exports = new webhooksController;