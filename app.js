const express = require('express')
const connectDB = require('./app/config/db')

const app = express()

// Connect Database
connectDB();

app.get('/', (req, res) => res.send('hello'))

const port = process.env.PORT || 8082

app.listen(port, () => console.log(`Server running on port ${port}`));