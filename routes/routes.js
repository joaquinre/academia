const authController = require("../app/controllers/authController")
const homeController = require("../app/controllers/homeController")

function initRoutes(app, jsonParser) {
	app.get('/', homeController().index)	

	app.get('/login', authController().login)

	app.get('/register', authController().register)
	app.post('/register', jsonParser, authController().postRegister)
}

module.exports = initRoutes