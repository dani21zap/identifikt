'use strict';
const axios = require('axios');
var fs = require('fs');
const mongoose = require('mongoose');
const Promise = require('bluebird');
// const ConektaClass = require('../vendor/conekta');
// const Conekta = new ConektaClass();
const Payments = require('../models/payments.model');
const Apps = require('../models/apps.model');
const Accesses = require('../models/accesses.model');
const AccessesRequests = require('../models/accessesrequests.model');
const Mail = require('../vendor/mail/mail');
// const Ecommerces = require('../models/ecommerces.model');
const Users = require('../models/users.model');
const InvoiceUtil = require('../utils/createInvoice.util');
const pdf = require('html-pdf');
const AWSUtil = require('../utils/awsS3.util');
const https = require('https');
// const ejs = require('ejs');

class PaymentsController {

    payments(req, res, next) {
        var limit = parseInt( req.query.limit ) || 10 ;
        var page = parseInt( req.query.page ) || 1 ;
        Payments.aggregate( [
            { $match : {
                "user_id": mongoose.Types.ObjectId(req.user.id)
                }
            },{
               $facet: {
                    'payments':[ {
                        $sort: { created_at:-1 }
                    },{
                        $skip: (page * limit) - limit
                    }, {
                        $limit: limit
                    } ],
                    'count':[ {
                            $count:'total'
                    } ]
                }
            }, { $project: {
                'payments':'$payments',
                'infoPayments': {
                    'count' : { '$arrayElemAt': ['$count.total',0] },
                    'pages' : { $ceil: { $divide: [{'$arrayElemAt': ['$count.total',0]},  limit ] } }
                }
            }
        } ] )
       .then( response => {
            res.status(200).json(response[0])
        })
        .catch( err => next(err) )
    }

    paymentInfo(req, res, next) {
        var limit = parseInt( req.query.limit ) || 10 ;
        var page = parseInt( req.query.page ) || 1 ;
        return Payments.aggregate( [ {
            '$facet' : {
                'apps':[{
                    $match: {
                            _id: mongoose.Types.ObjectId(req.params.paymentId)
                            // user_id: mongoose.Types.ObjectId(req.user.id)
                        }
                    }, {
                        $lookup: {
                            from: 'apps',
                            localField: 'user_id',
                            foreignField: 'user_id',
                            as: 'apps'
                        }
                    }, {
                        $unwind: '$apps'
                    }, {
                         $skip: (page * limit) - limit
                    }, {

                        $limit: limit
                    }, {
                        $project: {
                            _id: '$apps._id',
                            name: '$apps.name',
                            app_id: '$apps.app_id' ,
                            price: '$price',
                            count_requests: '$apps.requests'
                            // requests: { $push: "$accesses_requests"}
                        }
                } ],
                'count':[ {
                        $match: {
                            _id: mongoose.Types.ObjectId(req.params.paymentId)
                        }
                    }, {
                        $lookup: {
                            from: 'apps',
                            localField: 'user_id',
                            foreignField: 'user_id',
                            as: 'apps'
                        }
                    }, {
                        $unwind: '$apps'
                    }, {
                        $count: 'total'
                } ],
                'payment':[ {
                        $match: {
                            _id: mongoose.Types.ObjectId(req.params.paymentId)
                        }
                } ]
            }
            }, { $project: {
                'info': {'$arrayElemAt': ['$payment',0]},
                'apps': '$apps',
                'appsInfo': {
                    'count': {'$arrayElemAt': ['$count.total',0]},
                    'pages': { $ceil: { $divide: [ {'$arrayElemAt': ['$count.total',0] },  limit ] } }
                }
            }
        }] )
        .then( async response => {
            if(!response[0].info){
                throw new NotFoundError("The payment does not exist.");
            }
            response.apps = await Promise.all(response[0].apps.map( app => {
                 return AccessesRequests.countDocuments({ payment_id: req.params.paymentId, app_id: app._id, code:'200'})
                .then( async accessesrequests => {
                    app.count = accessesrequests;
                    app.price = response[0].info.price;
                    app.total = accessesrequests * app.price;
                    app.amount = accessesrequests * app.price;
                    return app;
                })
                .catch(err => next(err))
            }))
            res.status(200).json(response[0])
        })
        .catch(err => next(err))
    }

    async paymentListStores(req, res, next) {
        var limit = parseInt(req.query.limit) || 10 ;
        var page = parseInt(req.query.page) || 1 ;
        return Apps.findOne({
            app_id: req.params.appId
        },{ 'ecommerces': 0, 'oauth': 0 } )
        .then(app => {
            if (!app) {
                throw next('The app does not exist.');
            }
            Payments.aggregate( [ {
                    $match: { _id: mongoose.Types.ObjectId(req.params.paymentId) }
                }, {
                    $lookup: {
                        from: 'accesses_requests',
                        localField: '_id',
                        foreignField: 'payment_id',
                        as: 'requests'
                    }
                }, {
                    $unwind: '$requests'
                }, {
                    $match: {
                        'requests.app_id': app._id
                    }
                }, {
                    $lookup: {
                        from: 'accesses',
                        localField: 'requests.access_id',
                        foreignField: '_id',
                        as: 'access'
                    }
                },
                // {
                //     $project: {
                //         request: {
                //             $filter: {
                //                 input: '$access',
                //                 cond: { $eq: ['$$request.code', '200'] },
                //                 as: 'request'
                //             }
                //         }
                //     }
                // },
                {
                    $unwind: '$access'
                }, {
                    $facet : {
                        count: [ {
                                $group: {
                                    _id:'$access._id',
                                    count:{$sum: '$access._id' }
                                }
                            },{
                                $count:'total'
                        }],
                        stores:[ {
                                $project: { 'price':1,'access._id': 1, 'access.requests': 1, 'access.app_id': 1, 'access.access.url': 1,'access.ecartapi': 1, 'access.created_at': 1, 'access.active': 1, 'access.deleted': 1, 'access.access_token': 1, 'access.access.ecommerce': 1 }
                            },{
                                $group: {
                                    _id: '$access._id',
                                    access: { $first: '$access' },
                                    price: { $first: '$price'},
                                    count: { $sum: 1 },
                                    amount: { $sum: { $multiply: ['$price', { $sum: 1}]}},
                                    requests: { $push: '$requests'},
                                }
                            },{
                                 $skip: (page * limit) - limit
                            },{

                                $limit: limit
                            },{
                                $sort: {
                                    price: -1
                                }
                        }]
                    }
                },{
                    $project: {
                        info:  {
                            'total': { '$arrayElemAt': ['$count.total',0] },
                            'pages': { $ceil: { $divide: [{'$arrayElemAt': ['$count.total',0]},  limit ] } }
                        },
                        stores: '$stores'
                    }
                }
            ] )
            .then(data => {
                Payments.find({
                    _id: mongoose.Types.ObjectId(req.params.paymentId)
                })
                .then ( async payment => {
                        res.status(200).json({
                            app:app,
                            payment: payment,
                            paymentId:req.params.paymentId,
                            stores: data[0].stores,
                            storesInfo: data[0].info
                        })
                })
                .catch( err => next(err) )
            }).catch ( err => next(err) )
        })
        .catch(err => next(err));
    }

	async invoicesCreate(req, res, next) {
        return Users.find({ active:true })
		.then( async users => {
			var date = new Date();
			var monthEnd = date.getMonth(); //meses 0 = enero
			var yearEnd = date.getFullYear();
			let data = await Promise.all([ users.map(  user => InvoiceUtil.create(user, monthEnd, yearEnd, next, res)) ]);
            res.status(200).json({ success: true });
		})
		.catch(err => next(err));
	}

    async paymentSuccess(req, res, next){
		if (mongoose.Types.ObjectId(req.body.data.id)) {
            let token = await axios.post(`${process.env.PAYMENT_URL}/api/authorizations/token`, null, {
                timeout:25000,
                auth: {
                    username: process.env.PAYMENT_PUBLIC,
                    password: process.env.PAYMENT_PRIVATE
                }
            })
            .then(response => response.data.token)
            .catch(err => err);

			return await axios.get(`${process.env.PAYMENT_URL}/api/orders/${req.body.data.id}`, {
				timeout:25000,
				headers:{
					Authorization: token
				}
			})
			.then(response => {
                //Send confirmation of payment email
				Payments.findOneAndUpdate({
					payment_order_id: mongoose.Types.ObjectId(req.body.data.id)
				}, {
					$set:{
						paid_at: new Date(),
						status: response.data.status,
						payment_method: response.data.payments,
						risk_score: response.data.risk_score
					}
				}, { new: true })
				.then(async response => {
                    const user = await Users.findById(response.user_id).then(res=>res).catch(err => err);
                    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
                    let body = {
                        subject: `We have received your payment`,
                        body: `This email is to inform that the payment for the invoice ${response.number} corresponding to the ${months[new Date(response.begin).getMonth()]} month has been received. Thank you for working with EcartAPI. If you need to retrive a receipt clink on the button below.`,
                        link: response.pay_link || 'https://ecartapi.com/dashboard',
                        bcc: "ecartapi.com+7c58bcacb0@invite.trustpilot.com"
                    }
                    new Mail(res).news(body, user.email, user, { text: 'Get receipt' });
                    return response;
                })
				.catch(err => {
					if (process.env.NODE_ENV == 'development') {
						console.log( 'payment_error: ', err)
					}
					return next(err);
				});
				return res.status(200).json({ success: true });
			})
			.catch(err => {
				if (process.env.NODE_ENV == 'development') {
					console.log(err.response && err.response.data ? err.response : 'Unknown error ocurred')
				}
				next(new NotFoundError('This order has not been paid yet.'));
			});
		}
		return res.status(200).json({ success: true });
	}

    async createInvoicePdf(req, res, next){
        let create = ( payment, user, method) => {
            payment.info.created_at = new Date(payment.info.created_at).toDateString().slice(4);
            payment.info.totals.subtotal = payment.info.totals.subtotal.toFixed(2);
            payment.info.totals.tax = payment.info.totals.tax.toFixed(2);
            payment.info.totals.discount = payment.info.totals.discount.toFixed(2);
            payment.info.totals.total = payment.info.totals.total.toFixed(2);
            res.render('../views/invoicePdf', {
                payment: payment,
                info: user
            }, (err, html) => {
                if( err ) {
                        throw new ConflictError(err);
                }
                pdf.create( html, {
                    format: 'Letter',
                    header: { height: "15mm"},
                    footer: { height: "15mm" },
                    childProcessOptions: {
                        env: {
                          OPENSSL_CONF: '/dev/null',
                        },
                    }
                } )
                .toFile(`./server/public/site/assets/tmp/files/pdf/invoices/${payment.info._id}.pdf`, function(err, pdf) {
                    if (err){
                        throw new ConflictError(err);
                    }
                    if(method == 'POST') {
                        res.status(200).json( { success: true, invoice: pdf.filename })
                    }
                    else {
                        const uploadFile =  fs.readFileSync(pdf.filename);
                        AWSUtil.upload(uploadFile, `invoices/${payment.info.user_id}/${payment.info._id}.pdf`, 'application/pdf')
                        .then( file => {
                            Payments.findOneAndUpdate({
                                _id : mongoose.Types.ObjectId(payment.info._id)
                            },{
                                $set: {
                                    'url_pdf':file
                                }
                            },{
                                new: true
                            })
                            .then(async update => {
                                res.status(200).json( { success: true, invoice:`https://ecartapi.s3.amazonaws.com/invoices/${update.user_id}/${update._id}.pdf` } );
                            })
                        })
                        .catch(err => next(err))
                    }
                })
            });
        }

        let getUserAddress = (userId) => {
            return Users.findOne(
                {
                    _id : mongoose.Types.ObjectId(userId)
                },{
                    "poNumber": 1,
                    "company": 1,
                    "address": 1
                }
            )
            .then( user => user)
            .catch(err => next(err));
        };

        let paymentData = async (paymentId) => {
             return await axios.get(`${process.env.HOSTNAME}/api/payments/${paymentId}`, {
                headers: {
                    Authorization: req.headers.authorization
                }
            })
            .then( async payment => payment.data)
            .catch(err => next(err))
        }

        if( (req.params && req.params.paymentId) && req.method == 'GET' ) {
            let payment = await paymentData(req.params.paymentId);
            if( payment.info.url_pdf ){
                try {
                    let existsPdf = await axios.head(`https://ecartapi.s3.amazonaws.com/invoices/${payment.info.user_id}/${req.params.paymentId}.pdf`)
                    return res.status( 200 ).json( { success:true , invoice : payment.info.url_pdf } )
                }
                catch(e){
                    let user = await getUserAddress( payment.info.user_id );
                    return create( payment, user, req.method );
                }
            }
            let user = await getUserAddress( payment.info.user_id );
            return create( payment, user, req.method );

        } else if ( (Object.keys(req.body).length > 0) && req.method == 'POST' ) {
            let payment = await paymentData( req.body.paymentId );
            await create(payment, req.body.user, req.method);
        }
    }

    async deleteInvoicePdf(req, res, next){
        try {
            let existsPdf = await axios.head(`https://ecartapi.s3.amazonaws.com/invoices/${req.user.id}/${req.params.paymentId}.pdf`)
            AWSUtil.delete(`invoices/${req.user.id}/${req.params.paymentId}.pdf`)
            .then(deleted => {
                Payments.updateOne( {
                    url_pdf: { $exists: true },
                    user_id: mongoose.Types.ObjectId(req.user.id),
                    _id: mongoose.Types.ObjectId(req.params.paymentId),
                }, {
                    $set: {
                        'url_pdf':'deleted'
                    }
                })
                .then(success => {
                    if(success.nModified == 1)
                        res.status(200).json( { success: true } );
                })
            })
            .catch(err => next(err))
        }
        catch(e){
            next(new NotFoundError('Invoice not found.'));
        }
    }

    async emailNotifications(req, res, next) {
        Users.aggregate([
            { $match: { active: true } },
            {
                $lookup: {
                    from: 'payments',
                    let: { id: '$_id' },
                    pipeline: [
                     { $match: {
                         $expr:{
                             $and:
                               [
                                 { $eq: [ '$user_id',  '$$id' ] },
                                 { $eq: [ '$status', 'pending' ] }
                               ]
                        }
                    }},
                    { $sort: { end: -1 } }
                    ],
                    as: "payments"
                }
            },
        ])
        .then(users => {
            let usersWithDebt = users.filter( user => user.payments.length > 0);
            usersWithDebt.forEach((user) => {
                let body = null;
                let difference = Math.abs(user.payments[0].end.getTime() - new Date().getTime());
                if (user.payments.length >= 2) {
                    if (user.payments.length == 2 && difference/86400000 > 15) {
                        body = {
                            subject: `EcartAPI Invoice ${user.payments[1].number} overdue.`,
                            body: `Your invoice #${user.payments[1].number} is now overdue. Your account has been blocked. Please satisfy your balance of ${user.payments[1].totals.total.toFixed(2)} USD as soon as possible to regain API access.
                            you can view and pay your invoice online at ${user.payments[1].pay_link}.`,
                            link: user.payments[1].pay_link || 'https://ecartapi.com/dashboard'
                        };
                    } else if (user.payments.length < 4 && difference/86400000 > 20) {
                        body = {
                            subject: `EcartAPI Final Notice for overdue Invoices.`,
                            body: `Your account has more than one invoice awaiting for payment. Please pay your due balance to regain access to the API. If failed to complete payment in the next 30 days we will take action and deactivate the account until further notice is received.`,
                            link: user.payments[1].pay_link || 'https://ecartapi.com/dashboard'
                        };
                    }
                } else if (difference/86400000 < 28){
                    user.payments[0].end = new Date(user.payments[0].end.getFullYear(), user.payments[0].end.getMonth() + 1 ,0)
                    body = {
                        subject: `EcartAPI Invoice ${user.payments[0].number} due`,
                        body: `Your payment of ${user.payments[0].totals.total.toFixed(2)} USD is due before ${user.payments[0].end}. Avoid service interruption by paying before the due date. Respond to this email promptly for more information. To view more information regarding your payment click the orange button.`,
                        link: user.payments[0].pay_link || 'https://ecartapi.com/dashboard'
                    };
                }
                if (body) {
                    new Mail(res).news(body, user.email, user, { text: 'Pay now!' });
                }
            });

            res.status(200).json( { success: true } );
        })
        .catch( err => {
            next(err);
        });
    }

}

module.exports = new PaymentsController();
