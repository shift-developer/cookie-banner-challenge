const { errorResponse } = require('../../network/responses')
const { generateToken } = require('../../services/AuthJwt')

const { createUser, validateCredentials, getUserDataById } = require('./store')


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
		return errorResponse({res, message: e.message, status: e.status})
	}
}

const loginUser = async (req, res) => {
	try {
		const {email, pass} = req.params.credentials
		const { _id } = await validateCredentials({email, password: pass})
		const {token, tokenExpiresAt} =  generateToken({userId: _id, email })
		return res.status(200).json({
			success: true,
			userId: _id,
			token,
			tokenExpiresAt
		})
	} catch (e) {
		return errorResponse({res, message: e.message, status: e.status})
	}
}

const getUserDataByTokenInfo = async (req, res) => {
	try {
		const {userId} = req.params.tokenInfo
		const userData = await getUserDataById(userId)
		const _user = {
			id: userData._id,
			fullName: userData.fullName,
			email: userData.email
		}
		return res.json(_user)
	} catch (e) {
		return errorResponse({res, message: e.message, status: e.status})
	}
}

module.exports = {
	registerUser,
	loginUser,
	getUserDataByTokenInfo
}