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
			'SELECT * FROM engomados WHERE plate = ? AND last_name = ?',
			[req.body.username, req.body.password]
			)
		.then(rows => {
	    	// If rows contain data, authentication is successful
			if (rows[0].length > 0) {
				let user = rows[0][0];
				let token = jwt.sign(
					{
						admin: false,
						id: user.plate,
						read: false,
						write: false,
						email: user.last_name
					},
					process.env.JWT_SECRET,
				);
				console.log(user)
				return res.status(200).json({
					success: true,
					token: token,
					user: {
						id: user.plate,
						read: true,
						write: false,
						email: null,
						data: user
					}
				});
			} else {
				throw new UnauthorizedError('Información equivocada');
			}
		})
		.catch (error => {
			console.log('Database error:', error);
			next(error);
		});
	}

	createAdmin(req, res, next) {
		const hashedPassword = bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_SALT));
		DB_pool.query(
			'INSERT INTO admin (first_name, last_name, password, username) VALUES (?, ?, ?, ?)',
			[
				req.body.first_name,
				req.body.last_name,
				hashedPassword,
				req.body.email
			]
		)
		.then( () => {
			res.status(201).json({
				success: true,
				message: `New user created with email: ${req.body.email}`
			});
		})
		.catch(err => {
			console.log('Database error:', err);
			next(err);
		});		
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
			'SELECT * FROM engomados WHERE plate = ?',
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
