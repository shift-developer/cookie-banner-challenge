const express = require('express')
const router = express.Router()

const { authenticateUser, validateBodyDomain } = require('./middlewares')
const {
	insertDomain,
	updateDomain,
	deleteDomain,
	getDomain,
	getAllDomainsByUserId
} = require('./controller')

router.post('/',[authenticateUser, validateBodyDomain], insertDomain)

router.put('/:id',[authenticateUser], updateDomain)

router.get('/', [authenticateUser], getAllDomainsByUserId)

router.get('/:id', getDomain)

router.delete('/:id', [authenticateUser], deleteDomain)

module.exports = router