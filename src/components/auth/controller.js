const { errorResponse } = require('../../network/responses')
const { generateToken } = require('../../services/AuthJwt')

const { createUser } = require('./store')


const registerUser = async (req, res) => {
	try {
		const { email, password, fullName } =  req.body
		const {_id } = await createUser({email, password, fullName})
		const {token, tokenExpiresAt} = generateToken({userId: _id, email })
		return res.status(201).json({
			success: true,
			userId: _id,
			token,
			tokenExpiresAt
		})
	} catch (e) {
		return errorResponse({res, message: e.message, status: e.code})
	}
}

module.exports = {
	registerUser
}