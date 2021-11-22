const express = require('express')
const router = express.Router()

const { validateBasicLoginToken, authenticateUser } = require('./middlewares')
const { registerUser, loginUser, getUserDataByTokenInfo } = require('./controller')

router.post('/register', registerUser)

router.post('/login',[validateBasicLoginToken], loginUser)

router.get('/', [authenticateUser], getUserDataByTokenInfo)

module.exports = router