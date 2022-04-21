const express = require('express')
// const connectDB = require('./app/config/db')

const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')

const app = express()

const mongoose = require('mongoose')

// Connect Database
mongoose
	.connect(
		"mongodb+srv://joaquinre123:vATLxou9u48jR4FN@cluster0.6apjs.mongodb.net/Academia?retryWrites=true&w=majority", { useNewUrlParser: true }
	)
	.then(() => {
		console.log('Database connected..');
	})
	.catch((err) => {
		console.error(err);
	})

// Assets
app.use(express.static('public'))


// set Template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

// routes

require('./routes/routes')(app)


const port = process.env.PORT || 8082
app.listen(port, () => 
	console.log(`Server running on port ${port}`));