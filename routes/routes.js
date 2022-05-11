const authController = require("../app/controllers/authController")
const homeController = require("../app/controllers/homeController")
const adminVideoController = require("../app/controllers/admin/videoController")
const guest = require('../app/middlewares/guest')

function initRoutes(app) {
	app.get('/', homeController().index)	

	app.get('/login', guest, authController().login)
	app.post('/login', authController().postLogin)

	app.get('/register', guest, authController().register)
	app.post('/register', authController().postRegister)
	app.post('/logout', authController().logout)

	app.get('/admin/uploads', adminVideoController().index)
	app.post('/admin/uploads', adminVideoController().uploadVideo)
}

module.exports = initRoutes