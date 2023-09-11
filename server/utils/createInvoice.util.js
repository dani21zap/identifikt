'use strict'
const Payments = require('../models/payments.model');
const AccessesRequests = require('../models/accessesrequests.model');
const Accesses = require('../models/accesses.model');
const Apps = require('../models/apps.model');
const Users = require('../models/users.model');
const Mail = require('../vendor/mail/mail');
const mongoose = require('mongoose');
const axios = require('axios');

class CreateInvoice {

    constructor() {
        this.domain_price = 19.99;
        this.prices =  [
            {
                min: 1,
                max: 1000,
                price: 0,
                min_price:0
            },
            {
                min: 1001,
                max: 10000,
                price: 0.01,
                min_price:10
            },
            {
                min: 10001,
                max: 100000,
                price: 0.003,
                min_price:100
            },
            {
                min: 100001,
                max: 1000000,
                price: 0.001,
                min_price:300
            },
            {
                min: 1000001,
                price: 0.0005,
                min_price:1000
            }
        ];
    }

    async authenticate(req, res, next) {
        return await axios.post(`${process.env.PAYMENT_URL}/api/authorizations/token`, null, {
            timeout:25000,
            auth: {
                username: process.env.PAYMENT_PUBLIC,
                password: process.env.PAYMENT_PRIVATE
            }
        })
        .then(authenticate => {
            return { token: authenticate.data.token };
        })
        .catch(err => {
            return next(err);
        });
    }

    async create(user, monthEnd, yearEnd, next, res) {
        let domains = 0;
        let requests = 0;
        let auth = user.client_id;
        if (!mongoose.Types.ObjectId.isValid(user._id)) {
            throw new ConflictError('The user does not exist.');
        }
        var monthBegin = monthEnd !== 0  ? monthEnd - 1 : 11
        var yearBegin = monthEnd == 0 ? yearEnd - 1 : yearEnd

        let begin_date = new Date(yearBegin, monthBegin);
        let end_date = new Date(yearEnd, monthEnd);
        if (end_date.getTime() > Date.now()) {
            return { message:'Invoice can not be created before month ends.' };
        }
        let payment = await Payments.findOne({
            user_id: mongoose.Types.ObjectId(user._id),
            begin: begin_date, //meses 0 = enero
            end: end_date
        })
        .then(payment => payment)
        .catch(err => next(err) );

        if (payment) {
            return { message:'Invoice already created' };
        }

        domains = await Apps.countDocuments({
            user_id: mongoose.Types.ObjectId(user._id),
            own_domain: true
        })
        .then(apps => apps)
        .catch(err => next(err) );

        await AccessesRequests.countDocuments({
            user_id: mongoose.Types.ObjectId(user._id),
            code: { $eq: "200" },
            created_at: {
                $gte: new Date(begin_date),
                $lt: new Date(end_date)
            }
        })
        .then( async requests => {

            if(requests == 0 && domains == 0){
                return { message:'App not used' };
            }

            let model = new Payments({
                user_id: user._id,
                company: user.company || null,
                number: `EC${new Date().getTime()}`,
                price: 0,
                totals: {
                    domains: null,
                    subtotal: 0,
                    tax: null,
                    total: null,
                    discount: 0,
                    requests: null
                },
                begin: begin_date,
                end: end_date
            });

            let prices = this.prices;
            if (user.discount && user.discount.prices) {
                if ( (user.discount.prices.until && (new Date (user.discount.prices.until) >  new Date (end_date)) || !user.discount.prices.until) ) {
                    prices = user.discount.prices.value
                }
            }

            for (let key in prices) {
                if (typeof prices[key].max === 'undefined' && requests >= prices[key].min) {
                    var subtotal = prices[key].min_price
                    model.price = prices[key].price; break;
                }
                if (requests >= prices[key].min && requests <= prices[key].max) {
                    var subtotal = prices[key].min_price
                    model.price = prices[key].price; break;
                }
            }
            let requests_total = model.price * requests;
            model.totals = {
                requests: requests,
                subtotal: subtotal > requests_total ? subtotal : requests_total,
                tax: 0,
                total: 0,
                discount:0,
                domains: domains * this.domain_price
            }
            model.totals.subtotal = model.totals.subtotal + model.totals.domains;
            if (user.discount && model.totals.subtotal > 0) {
                if (user.discount.percentage) {
                    if ( (user.discount.percentage.until && (new Date (user.discount.percentage.until) >  new Date (end_date)) || !user.discount.percentage.until) ) {
                        model.totals.discount = model.totals.subtotal * (user.discount.percentage.value / 100);
                    }
                }
                if (user.discount.amount) {
                    if ( (user.discount.amount.until && (new Date (user.discount.amount.until) >  new Date (end_date)) || !user.discount.amount.until) ) {
                        model.totals.discount = user.discount.amount.value;
                    }
                }
            }
            model.totals.total = model.totals.subtotal - model.totals.discount;
            model.totals.total = Math.max(0 , model.totals.total);
            let payment_order = null;
            if (model.totals.total > 0) {
                let body = {
                    customer_id: user.payment_customer_id,
                    user_id: user._id,
                    email: user.email,
                    first_name: user.first_name || user.company || user.email ||'No information',
                    last_name: user.last_name || 'No information',
                    phone: user.phone,
                    currency: "USD",
					confirm: true,
					auto_billing: true,
                    notify_url: `${process.env.HOSTNAME}/api/payment/success`,
                    items: [
                        {
                            name: `Invoice-${model.number}`,
                            quantity: 1,
                            price: model.totals.subtotal.toFixed(2),
                            discount: model.totals.discount.toFixed(2)
                        }
                    ]
                };
                let token = await axios.post(`${process.env.PAYMENT_URL}/api/authorizations/token`, null, {
                    timeout:25000,
                    auth: {
                        username: process.env.PAYMENT_PUBLIC,
                        password: process.env.PAYMENT_PRIVATE
                    }
                })
                .then(response => response.data.token)
                .catch(err => err);

                payment_order = await axios.post(`${process.env.PAYMENT_URL}/api/orders`, body, {
                    timeout:25000,
                    headers:{
                        Authorization: token
                    }
                })
                .then(response => response.data)
                .catch(err => err);
            }

            model.payment_order_id = payment_order && payment_order.id ? mongoose.Types.ObjectId(payment_order.id) : null;
            model.risk_score = payment_order && payment_order.risk_score ? payment_order.risk_score : 0;
            model.pay_link = model.totals.total > 0 ? payment_order.pay_link : `${process.env.HOSTNAME}/dashboard/payment/completed`;

            if (model.totals.total == 0) {
                model.status = 'paid';
            }

            return model.save()
            .then(payment => {
                if (payment.totals.total > 0 ) {
                    let cc = user.settings && user.settings.cc_email ? user.settings.cc_email : null;
                    //Crear invoicePDF a partir de post: Ajustar llamada
                    new Mail(res).invoice( user.email, payment.pay_link, user, payment, cc, auth);
                }
                Payments.countDocuments({user_id: user._id, status: 'pending'})
                .then(response => {
                    if (response == 2) {
                        body = {
                            subject: `Notice of temporary service suspension.`,
                            body: `We would like to inform you that due to missing payments we have applied a temporary suspension of services. To re-activate the services please pay your pending invoices. For more information promptly respond to this email or visit your dashboard.`,
                            link: payment.pay_link || 'https://ecartapi.com/dashboard'
                        }
                        new Mail(res).news(body, user.email, user, { text: 'Re-activate your service' });
                    }
                })
                .catch(err => err);

                AccessesRequests.updateMany(
                    {
                        user_id: mongoose.Types.ObjectId(user._id),
                        code: { $eq: "200" },
                        created_at: {
                            $gte: new Date(begin_date),
                            $lt: new Date(end_date)
                        }
                    },
                    {
                        $set:{
                            payment_id: mongoose.Types.ObjectId(payment._id)
                        }
                })
                .then(data => data)
                .catch(err => err);
                Apps.updateMany({
                    user_id: mongoose.Types.ObjectId(user._id),
                    "$expr":{ "$gte": ["$month_requests",1]}
                },
                {
                    $set: {
                        "month_requests": 0
                    }
                })
                .then(data => data)
                .catch(err => err)

                let body =  {
                    "month_requests": 0
                };
                if (!user.payment_id && payment_order) {
                    body.payment_id = mongoose.Types.ObjectId(payment_order.account_id);
                }

                Users.updateOne({
                    _id: mongoose.Types.ObjectId(user._id),
                    "$expr":{ "$gte": ["$month_requests",1]}
                },
                {
                    $set: body
                })
                .then(data => data)
                .catch(err => err)

                return {
                    _id: payment._id,
                    user_id: payment.user_id,
                    year: payment.year,
                    price: payment.price,
                    totals: payment.totals,
                    period: payment.period,
                    status: model.totals.total == 0 ? 'paid' : payment.status,
                    created_at: payment.created_at
                };

            })
            .catch(err => next(err));

        })
        .catch(err => next(err));
    }

}

module.exports = new CreateInvoice;
