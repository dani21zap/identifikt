'use strict'
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

class usersController {

	async createLogin(req, res, next) {
    	// Check if the username and password match in the database
		return DB_pool.query(
			'SELECT * FROM admin WHERE username = ? AND password = ?',
			[req.body.username, req.body.password]
			)
		.then(rows => {
	    	// If rows contain data, authentication is successful
			if (rows[0].length > 0) {
				let user = rows[0][0];
				let token = jwt.sign(
				{
					admin: true,
					id: user.id,
					read: user.scope_read,
					write: user.scope_write,
					email: user.email
				},
				process.env.JWT_SECRET,
				);
				return res.status(200).json({
					success: true,
					token: token,
					user: {
						id: user.id,
						read: user.scope_read,
						write: user.scope_write,
						email: user.email
					}
				});
			    	// return rows[0];
			} else {
				throw new UnauthorizedError('Username or password incorrect');
			}
		})
		.catch (error => {
			console.log('Database error:', error);
			next(error);
		});
	}

	async createPlateLogin(req, res, next) {
    	// Verificacion placa apellido aparecen en la base de datos
		return DB_pool.query(
			'SELECT * FROM engomados WHERE plate_id = ? AND owner_lastname = ?',
			[req.body.username, req.body.password]
			)
		.then(rows => {
	    	// If rows contain data, authentication is successful
			if (rows[0].length > 0) {
				let user = rows[0][0];
				let token = jwt.sign(
					{
						admin: false,
						id: user.plate_id,
						read: false,
						write: false,
						email: user.owner_lastname
					},
					process.env.JWT_SECRET,
				);
				return res.status(200).json({
					success: true,
					token: token,
					user: {
						id: user.plate_id,
						read: true,
						write: false,
						email: null,
						data: user
					}
				});
			} else {
				throw new UnauthorizedError('Username or password incorrect');
			}
		})
		.catch (error => {
			console.log('Database error:', error);
			next(error);
		});
	}

	createRegister(req, res, next) {
		let user = {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			password: req.body.password,
			email: req.body.email,
			password_confirmation: req.body.password_confirmation,
			country: req.body.country,
			phone:req.body.phone
		}
		return new Users(user).save()
		.then(response => {
			new Mail(res).confirmation( response.email, `${process.env.HOSTNAME}/api/confirmation/${response._id}` );
			res.status(201).json({success: true});
		})
		.catch(err => next(err));
	}

	account(req, res, next) {
		console.log(req.user);
		if (req.user.admin) {
			return DB_pool.query(
				'SELECT * FROM admin WHERE id = ?',
				[req.user.id]
			)
			.then(([rows, fields]) => {
				console.log(rows)
		    	// If rows contain data, authentication is successful
				if (rows.length > 0) {
					return res.status(200).json(rows[0]);
				    	// return rows[0];
				} else {
					throw new UnauthorizedError('Username or password incorrect');
				}
			})
			.catch (error => {
				console.log('Database error:', error);
				next(error);
			});
		} else {
			return DB_pool.query(
			'SELECT * FROM engomados WHERE plate_id = ?',
			[req.user.id]
			)
		.then(rows => {
	    	// If rows contain data, authentication is successful
			if (rows[0].length > 0) {
				let user = rows[0][0];
				return res.status(200).json(user);
			} else {
				throw new UnauthorizedError('Username or password incorrect');
			}
		})
		.catch (error => {
			console.log('Database error:', error);
			next(error);
		});
		}
    }
}

module.exports = new usersController();
