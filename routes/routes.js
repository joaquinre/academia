const authController = require("../app/controllers/authController")
const homeController = require("../app/controllers/homeController")
const adminVideoController = require("../app/controllers/admin/videoController")

function initRoutes(app, jsonParser) {
	app.get('/', homeController().index)	

	app.get('/login', authController().login)
	app.post('/login', authController().postLogin)

	app.get('/register', authController().register)
	app.post('/register', jsonParser, authController().postRegister)

	app.get('/admin/uploads', adminVideoController().index)
	app.post('/admin/uploads', adminVideoController().uploadVideo)
}

module.exports = initRoutes