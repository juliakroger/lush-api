const express = require('express')
const connectDB = require('./app/config/db')

const app = express()
connectDB()

app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.send('API running'))

app.listen(process.env.PORT || 5000, () => console.log('Server running'))
