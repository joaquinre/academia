const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
	email: { type: String, required: true, unique: true }, 
	fullname: { type: String, required: true }, 
	phoneNumber: { type: Number, required: true, unique: true }, 
	password: { type: String, required: true },
	notifications: [],
	role: { type: String, default: 'customer' }
	
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)