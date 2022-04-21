const authController = require("../app/controllers/authController")
const homeController = require("../app/controllers/homeController")

function initRoutes(app) {
	app.get('/', homeController().index)	

	app.get('/login', authController().login)

	app.get('/register', authController().register)
}

module.exports = initRoutes