const bcrypt = require('bcryptjs')
const User = require('../models/user')
const passport = require('passport')

function authController() {
	return {
		login(req, res) {
			res.render('auths/login')
		},
		postLogin(req, res, next) {
			passport.authenticate('local', (err, user, info) => {
				if (err) {
					req.flash('error', info.message)	
					return next(err)
				}
				if (!user) {
					req.flash('error', info.message)
					return res.redirect('/login') 
				}
				req.logIn(user, (err) => {
					if (err) {
						req.flash('error', info.message)	
						return next(err)
					}	
					return res.redirect('/')
					// console.log('login');		
				})
			})(req, res, next)
		},
		register(req, res) {
			res.render('auths/register')
		},
		async postRegister(req, res) {
			const { email, fullname, phoneNumber, password } = req.body
			// validate requst
			if (!fullname || !email || !phoneNumber || !password) {
				req.flash('error', 'All Fields are required')
				req.flash('name', fullname)
				req.flash('email', email)
				return res.redirect('/register')	
			}

			// check if email exits
			User.exists({ email: email }, (err, result) => {
				if (result) {
					req.flash('error', 'Email already taken')	
					req.flash('name', fullname)
					req.flash('email', email)
					return res.redirect('/register')
				}
			})
			// hash password
			const hashedPassword = await bcrypt.hash(password, 10)

			// create user
			const user = new User({
				fullname,
				email,
				phoneNumber,
				password: hashedPassword 
			})

			user.save().then((user) => {
				
				return res.redirect('/')
			}).catch(err => {
				console.log(err);
				req.flash('error', 'Something went wrong')
				return res.redirect('/register')
			})
			console.log(req.body);
		},
		logout(req, res) {
			req.logout()
			return res.redirect('/login')
		}
	}	
}

module.exports = authController 