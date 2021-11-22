const jwt = require('jsonwebtoken')
const JWT_SIGNATURE = process.env.JWT_SIGNATURE
const EXPIRATION_TIME_IN_SECONDS =  172800 // 48 hours

const generateToken = ({userId, email}) => {
	const token = jwt.sign({userId, email}, JWT_SIGNATURE, { expiresIn:  EXPIRATION_TIME_IN_SECONDS})
	const tokenExpiresAt = Date.now() + EXPIRATION_TIME_IN_SECONDS * 1000 // unix time in ms
	return {token, tokenExpiresAt}
}

const authenticateToken = (authorization) => {

	try {
		if (!authorization) {
			throw new Error('You must provide a Bearer token in request headers.')
		}
	
		if (authorization.indexOf('Bearer ') === -1) {
			throw new Error('Bad format. Example: Bearer aAnUW1jas')
		}

		const token = authorization.replace('Bearer ', '')
		let tokenInfo = {}
		try {
			tokenInfo = jwt.verify(token, JWT_SIGNATURE)
		} catch (e) {
			throw new Error('Invalid credentials or expired token')
		}
		
		return tokenInfo

	} catch (e) {
		return Promise.reject({message: e.message, status: 401})
	}
}

module.exports = {
	generateToken,
	authenticateToken
}



