const { errorResponse } = require('../../network/responses')
const { authenticateToken } = require('../../services/AuthJwt')

const validateBasicLoginToken = (req, res, next) => {
	try {
		const authString = req.headers.authorization // Authorization: Basic base64_encoded(id:pass, example => "1:pass => MTpwYXNz)
		if(!authString || authString.indexOf('Basic') === -1) {
			return errorResponse({res, message: 'You must provide a Basic Auth Token in request headers (authorization). Example: Basic MTpwYXNz', status: 400})
		}

		const emailPassStr = (Buffer.from(authString.split(' ')[1], 'base64')).toString('utf-8')
		if(!emailPassStr) {
			return errorResponse({res, message: 'Invalid credentials, bad format', status: 400})
		}
		const [email, pass] = emailPassStr.split(':')
		req.params.credentials = {email, pass}
		return next()
	} catch (e) {
		return next()
	}
}

const authenticateUser = (req, res, next) => {
	try {
		const {authorization} = req.headers
		req.params.tokenInfo = authenticateToken(authorization)
		next()
	} catch (e) {
		return errorResponse({res, message: e.message, status: e.status})
	}
}

module.exports = {
	validateBasicLoginToken,
	authenticateUser
}