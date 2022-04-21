function authController() {
	return {
		login(req, res) {
			res.render('auths/login')
		},
		register(req, res) {
			res.render('auths/register')
		}
	}	
}

module.exports = authController 