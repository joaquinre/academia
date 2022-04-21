function authController() {
	return {
		login(req, res) {
			res.render('auths/login')
		},
		register(req, res) {
			res.render('auths/register')
		},
		postRegister(req, res) {
			const { email, fullname, phoneNumber, password } = req.body
			// validate requst
			if (!fullname || !email || !phoneNumber || !password) {
				return res.redirect('/register')	
			}
			console.log(req.body);
		}
	}	
}

module.exports = authController 