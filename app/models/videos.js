const mongoose = require('mongoose')
const Schema = mongoose.Schema

const videosSchema = new Schema({
	userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
	// filePath: { type: String, required: true},
	thumbnail: { type: String,},
	title: { type: String,},
	description: { type: String,},
	tags: { type: String,},
	category: { type: String,},
	transcoding: { type: Boolean },
	progress: { type: Number },
	minutes: { type: Number, default: 0},
	seconds: { type: Number, default: 0},
	watch: { type: Number, default: 0},
	views: { type: Number, default: 0},
	playlist: { type: String,},
}, { timestamps: true })

module.exports = mongoose.model('Videos', videosSchema)