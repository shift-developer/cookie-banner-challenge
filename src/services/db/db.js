const mongoose = require('mongoose')
const DB_URI = process.env.DB_URI || 'mongodb+srv://wibson:wibsonCHALLENGE@wibsonchallenge.oecoq.mongodb.net/productionDB?retryWrites=true&w=majority'

mongoose.connect(DB_URI)
	.then(() => console.log('Database connected successfuly'))
	.catch(e => console.error(e))

