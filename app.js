require('dotenv').config()
require('./src/services/db/db')
const express = require('express')
const path = require('path')
const app = express()
const setRoutesAPI = require('./src/network/routes')

app.use('/api',express.json({limit: '10mb', extended: true}))
app.use('/api' ,(err, req, res, next) => {
	console.log('entra')
	if (err) {
		res.status(400).json({success: false, msg: 'Bad format in JSON body'})
	} else {
		next()
	}
})

app.use('/api',(req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
	res.header('Allow', 'GET, POST, PUT, DELETE')
	next()
})

setRoutesAPI(app)

app.use(express.static(path.join(__dirname, 'banner-personalization-client','build')))
app.get('/*', (req, res) => {
	return res.sendFile(path.join(__dirname, 'banner-personalization-client','build','index.html'))
})


const PORT = process.env.PORT || 5000

app.listen( PORT, () => {
	console.log(`API initializated. Server listening on port ${PORT}`)
})