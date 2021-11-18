const { User } = require('../../services/db/models')
const { encrypt } = require('../../services/Encrypt')

const createUser = async ({email, password, fullName}) => {
	try {
		const userWithSameEmail = await User.find({email})
		if(userWithSameEmail.length > 0) {
			return Promise.reject({message: 'Email already exists', code: 409})
		}
		const _password = encrypt(password)
		const newUser = await User.insertMany([{email, password: _password, fullName}])

		return newUser[0]
	} catch (e) {
		return Promise.reject({message: 'Server internal error', code: 500})
	}
}

module.exports = {
	createUser
}