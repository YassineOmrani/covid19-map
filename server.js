const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const port = process.env.PORT || 4000
const routes = require('./routes/routes')

const app = express()

// load env variables
dotenv.config({
    path: './config/config.env'
})

// Body Parser
app.use(express.json())

// Enable CORS
app.use(cors())

// Static folder
app.use(express.static(path.join(__dirname, 'public')))


app.use('/api/v1',routes)


app.listen(port, () => console.log('Server up and running on PORT: '+ port))