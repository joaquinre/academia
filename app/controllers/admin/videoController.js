const { Formidable } = require('formidable')
const IncomingForm = require('formidable/src/Formidable')
const fileSystem = require('fs')

const User = require('../../models/user')
const Videos = require('../../models/videos')

function videoController() {
	return {
		index(req, res) {
			res.render('uploads')
		},
		uploadVideo(req, res) {
			const formData = new Formidable(IncomingForm)
			formData.maxFileSize = 1000 * 1024 * 1024
			formData.parse(req, (err, fields, files) => {

				console.log(req.session.user);

				const title = fields.video_title
				const description = fields.video_description
				const tags = fields.video_tags
				const category = fields.video_category
				
				const oldPathThumbnail = files.thumbnail.filepath
				const newThumbnail = '../Academia/public/thumbnails/' + files.thumbnail.newFilename
				const oldPathVideo = files.video.filepath
				const newPathVideo = '../Academia/public/videos' + files.video.newFilename

				fileSystem.rename(oldPathThumbnail, newThumbnail, (err) => {
					console.log('thumbnail error', err);
				})
				fileSystem.rename(oldPathVideo, newPathVideo, (err) => {
					console.log('video error', err);
				})
					
					// insert on database
				const video = new Videos({
					// filepath: newPathVideo,
					// thumbnail: thumbnail,
					title: title,
					description: description,
					tags: tags,
					category: category,
					transcoding: true,
					progress: 0,
					minutes: '',
					seconds: '',
					watch: '',
					views: 0,
					playlist: '',
				})

				video.save().then(video => {
					return res.redirect('/')
				}).catch(err => {
					console.log(err);
					return res.redirect('/admin/uploads')
				})
			})
		}
	}	
}

module.exports = videoController