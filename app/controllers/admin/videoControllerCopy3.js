const hbjs = require('handbrake-js')
const fileSystem = require('fs')


let Videos = require('../../models/videos')

function videoController() {
	return {
		index(req, res) {
			res.render('uploads')
		},
		uploadVideo(req, res) {
			let video = new Videos()
			console.log(req.body);
		}
	}	
}

module.exports = videoController