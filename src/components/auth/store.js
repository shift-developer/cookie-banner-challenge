const { User } = require('../../services/db/models')
const { encrypt, isEqualToEncryptedValue } = require('../../services/Encrypt')

const createUser = async ({email, password, fullName}) => {
	try {
		const userWithSameEmail = await User.find({email})
		if(userWithSameEmail.length > 0) {
			return Promise.reject({message: 'Email already exists', status: 409})
		}
		const _password = encrypt(password)
		const newUser = await User.insertMany([{email, password: _password, fullName}])

		return newUser[0]
	} catch (e) {
		return Promise.reject({message: 'Server internal error', status: 500})
	}
}

const validateCredentials = async ({email, password}) => {
	try {
		const resultsFromFind = await User.find({email})
		if(resultsFromFind.length === 0) {
			return Promise.reject({message: 'Invalid user or password', status: 401})
		}
		const {password:realPassword} = resultsFromFind[0]
		const isValidPass = isEqualToEncryptedValue(password, realPassword)
		if(!isValidPass) {
			return Promise.reject({message: 'Invalid user or password', status: 401})
		}

		return resultsFromFind[0]
	} catch (e) {
		return Promise.reject({message: 'Server internal error', status: 500})
	}
}

const getUserDataById = async (userId) => {
	try {
		const user = User.findById(userId)
		if(!user) {
			return Promise.reject({message: 'Invalid credentials', status: 401})
		}

		return user
	} catch (e) {
		return Promise.reject({message: 'Server internal error', status: 500})
	}
}

module.exports = {
	createUser,
	validateCredentials,
	getUserDataById
}