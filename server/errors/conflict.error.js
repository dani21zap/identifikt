"use strict";

class ConflictError extends Error{

	constructor(message){
		super(message || 'Conflict');
		this.name = this.constructor.name;
		this.status = 409;
		this.isJson =  true;
	}

	toJson() {
		return {
			statusCode: this.status,
			error: 'Conflict',
			message: this.message
		}
	}

}
module.exports = ConflictError;