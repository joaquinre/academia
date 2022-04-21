const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
	._id,
	email: { String, required: true, unique: true }, 
	fullName: { String, required: true }, 
	phoneNumber: { Number, required: true, unique: true }, 
	password: { String, required: true },
	role: { String, default: 'customer' }
	
}. { timestamps: true })

module.exports = mongoose.model('User', userSchema)