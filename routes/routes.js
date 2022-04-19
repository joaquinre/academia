function initRoutes(app) {
	app.get('/', (req, res) => {
		res.render('home')
	})	

	app.get('/login', (req, res) => {
		res.render('auths/login')
	})

	app.get('/register', (req, res) => {
		res.render('auths/register')
	})
}

module.exports = initRoutes