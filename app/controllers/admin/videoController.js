const IncomingForm = require("formidable/src/Formidable")

function upload() {
	return {
		index(req, res) {
			res.render('uploads')
		},
		uploadVideo(req, res) {
			const formData = new formidable(IncomingForm)
			formData.maxFileSize = 1000 * 1024 * 1024
			formData.parse(req, (err, fields, files) => {
				console.log('fields:', fields);
				console.log('files:', files);
			})
		}
	}
}

module.exports = upload