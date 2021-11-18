const bcrypt = require('bcrypt')
const SALT = 10

const encrypt = (text) => bcrypt.hashSync(text, SALT)

const isEqualToEncryptedValue = (text, hash) => {
	return bcrypt.compareSync(text, hash)
}

module.exports = {
	encrypt,
	isEqualToEncryptedValue
}