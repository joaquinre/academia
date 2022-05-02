const dotenv = require('dotenv').config()
const express = require('express')
// const connectDB = require('./app/config/db')
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

const app = express()
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')(session)
const mongoose = require('mongoose')
const passport = require('passport')

// Connect Database
mongoose
	.connect(
		"mongodb+srv://joaquinre123:vATLxou9u48jR4FN@cluster0.6apjs.mongodb.net/Academia?retryWrites=true&w=majority",
		{ useNewUrlParser: true }
	)
	.then(() => {
		console.log('Database connected..');
	})
	.catch((err) => {
		console.error(err);
	})

// let mongoStore = new MongoDbStore({
// 	mongooseConnection: connection,
// 	collection: 'sessions'
// })	

// session config
app.use(session({
	secret: process.env.COOKIE_SECRET,
	resave: false,
	// store: mongoStore,
	saveUninitialized: false,
	cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours
}))

// passport config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

// Assets
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// global middleware
app.use((req, res, next) => {
	res.locals.session = req.session
	res.locals.user = req.user
	next()
})

// set Template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

// routes

require('./routes/routes')(app, jsonParser)


const port = process.env.PORT || 8082
app.listen(port, () => 
	console.log(`Server running on port ${port}`));