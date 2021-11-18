const loginRouter = require('../components/auth/network')

const setRoutesAPI = ( app ) => {
	app.use('/api/auth', loginRouter)
}

module.exports = setRoutesAPI