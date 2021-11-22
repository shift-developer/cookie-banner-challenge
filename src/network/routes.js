const loginRouter = require('../components/auth/network')
const domainsRouter = require('../components/domains/network')

const setRoutesAPI = ( app ) => {
	app.use('/api/auth', loginRouter)
	app.use('/api/domains', domainsRouter)
}

module.exports = setRoutesAPI