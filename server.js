const express = require('express')
const connectDB = require('./app/config/db')
const log = require('./app/utils/log')
// const run = require('./app/jobs/browseProducts')
// const populate = require('./app/utils/populateUrls')

const app = express()
connectDB()

// run() -> used to run crowlers
// populate() -> used o populate urls database

app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.send('API running'))

app.listen(process.env.PORT || 5000, () => log.info('Server running'))
