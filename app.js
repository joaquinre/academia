const express = require('express')
// const connectDB = require('./app/config/db')

const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')

const app = express()

// Connect Database
// connectDB();

app.get('/', (req, res) => {
	res.render('home')
})

// set Template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

const port = process.env.PORT || 8082

app.listen(port, () => 
	console.log(`Server running on port ${port}`));