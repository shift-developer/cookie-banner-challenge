const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema({
	email: {
		type: String,
		index: true,
		unique: true
	},
	fullName: String,
	password: String
})

const User = model('User', userSchema)

const domainSchema = new Schema({
	domain: {
		type: String,
		index: true,
		unique: true
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'users',
		required: true
	},
	bckColor: String,
	primaryColor: String,
	fontColor: String
})

const Domain = model('Domain', domainSchema)

module.exports = {
	User,
	Domain
}