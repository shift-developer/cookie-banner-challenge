const express = require('express')
const { registerUser } = require('./controller')
const router = express.Router()

router.post('/register', registerUser)

module.exports = router