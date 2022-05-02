const Schema = mongoose.Schema

const videosSchema = new Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	filePath: { type: String, required: true},
	thumbnail: { type: String, required: true, default: 'foto.png'},
	title: { type: String, required: true},
	description: { type: String, required: true},
	tags: { type: String, required: false},
	category: { type: String, required: true},
	minutes: { type: Int, default: 0},
	seconds: { type: Int, default: 0},
	watch: { type: Int, default: 0},
	views: { type: Int, default: 0},
	playlits: { type: String, required: false},
}, { timestamps: true })

module.exports = mongoose.model('User', videosSchema)