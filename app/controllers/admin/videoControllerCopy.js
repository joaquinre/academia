const IncomingForm = require("formidable/src/Formidable")
const { Formidable } = require('formidable');
const { getVideoDurationInSeconds } = require('get-video-duration')
const fileSystem = require('fs')
const ObjectId = require("mongodb").ObjectId;
const User = require('../../models/user')
const Videos = require('../../models/videos')

// return user's documents


function videoController() {
	return {
		index(req, res) {
			res.render('uploads')
		},
		async uploadVideo(req, res) {
			
			console.log(User);	
				
			const formData = new Formidable(IncomingForm)
			formData.maxFileSize = 1000 * 1024 * 1024
			formData.parse(req, (err, fields, files) => {
				// console.log('fields:', fields);
				// console.log('files:', files);
				
				const title = fields.video_title
				const description = fields.video_description
				const tags = fields.video_tags
				const category = fields.video_category
				
				const oldPathThumbnail = files.thumbnail.filepath
				const thumbnail = '../../public/thumbnail'+ files.thumbnail.newFilename + '-' + files.thumbnail.originalFilename
				
				const oldPathVideo = files.video.filepath
				const newPath = '../../public/videos' + files.video.newFilename + '-' + files.video.originalFilename

				fileSystem.rename(oldPathThumbnail, thumbnail, (err) => {
					console.log('thumbnail upload error:', err);	
				})
				
				fileSystem.rename(oldPathVideo, newPath, (err) => {
					// get user data to save in videos document
					// getUser(req.session.user_id, (user) => {

						// console.log(req.user);
						console.log(user, _id);
						const currentTime = new Date().getTime()
						
						// get video duration
						getVideoDurationInSeconds(newPath).then((duration) => {
							const hours = Math.floor(duration / 60 / 60)	
							const minutes = Math.floor(duration / 60 ) - (hours * 60)	
							const seconds = Math.floor(duration % 60)	
							// insert on database
							const video = new Videos({
								"user": {
									"_id": user._id,
									"fullname": user.fullname,
								},
								"filePath": newPath,
								"thumbnail": thumbnail,
								"title": title,
								description: description,
								tags: tags,
								category: category,
								createdAt: currentTime,
								minutes: minutes,
								seconds: seconds,
								hours: hours,
								watch: currentTime,
								views: 0,
								playlist: "",
							})
							
							video.save().then((video) => {
								return res.redirect('/')
							});
						}).catch((err) => {
							console.log(err);
							return res.redirect('/admin/uploads')	
						})
						
					// })
				})
			})
		}
	}
}

module.exports = videoController