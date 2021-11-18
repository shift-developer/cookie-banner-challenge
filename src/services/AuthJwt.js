const jwt = require('jsonwebtoken')
const JWT_SIGNATURE = process.env.JWT_SIGNATURE
const EXPIRATION_TIME_IN_SECONDS =  172800 // 48 hours

const generateToken = ({userId, email}) => {
	const token = jwt.sign({userId, email}, JWT_SIGNATURE, { expiresIn:  EXPIRATION_TIME_IN_SECONDS})
	const tokenExpiresAt = Date.now() + EXPIRATION_TIME_IN_SECONDS * 1000 // unix time in ms
	return {token, tokenExpiresAt}
}

module.exports = {
	generateToken
}



