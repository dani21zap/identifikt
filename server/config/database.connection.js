'use strict';

const mongoose = require('mongoose');
const mysql = require('mysql2/promise');
const Promise = require('bluebird');

const config = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 30000,
    family: 4,
    useUnifiedTopology: true
};

const configSQL = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE,
}
module.exports.run = () => {
    mongoose.connect(process.env.ECART_URI_DB, config)
    .then(() => {
        Promise.promisifyAll(mongoose);
        console.log('Database connection SUCCESS!!');
    })
    .catch(err => {
        console.log('Database connection ERROR: ', err);
    });
    
    global.DB_pool = mysql.createPool(configSQL);
    // test DB connection
    DB_pool.getConnection()
    .then((connection) => {
        console.log('Connected to the database successfully');
        connection.release(); // Release the initial connection immediately
    })
    .catch((error) => {
        console.log('Error connecting to the database:', error);
    });

    return DB_pool;
}
