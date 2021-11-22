const { errorResponse } = require('../../network/responses')
const { 
	createDomain,
	updateDomainById,
	destroyDomainById,
	getDomainById,
	getDomainsFromUserId 
} = require('./store')

const insertDomain = async (req, res) => {
	try {
		const { domain, bckColor, primaryColor, fontColor } = req.body
		const {userId} = req.params.tokenInfo
		const { _id } = await createDomain({domain, userId, bckColor, primaryColor, fontColor})
		return res.status(201).json({
			success: true,
			domainId: _id
		})
	} catch (e) {
		return errorResponse({res, message: e.message, status: e.status})
	}
}

const updateDomain = async (req, res) => {
	try {
		const { domain, bckColor, primaryColor, fontColor } = req.body
		const { id } = req.params
		const {userId} = req.params.tokenInfo
		const { _id } = await updateDomainById({userId, id, domain, bckColor, primaryColor, fontColor})
		return res.status(200).json({
			success: true,
			domainId: _id
		})
	} catch (e) {
		return errorResponse({res, message: e.message, status: e.status})
	}
}

const deleteDomain = async (req, res) => {
	try {
		const { id } = req.params
		const {userId} = req.params.tokenInfo
		await destroyDomainById({id, userId})
		return res.status(204).json({
			success: true
		})
	} catch (e) {
		return errorResponse({res, message: e.message, status: e.status})
	}
}

const getDomain = async (req, res) => {
	try {
		const { id } = req.params
		const domain = await getDomainById({id})
		if(domain === null) {
			return res.status(404).json({
				success: false,
				message: 'Resource not found'
			})
		}
		return res.status(200).json({
			success: true,
			data: domain
		})
	} catch (e) {
		return errorResponse({res, message: e.message, status: e.status})
	}
}

const getAllDomainsByUserId = async (req, res) => {
	try {
		const {userId} = req.params.tokenInfo
		const domains = await getDomainsFromUserId({userId})
		return res.status(200).json({
			success: true,
			data: domains
		})
	} catch (e) {
		return errorResponse({res, message: e.message, status: e.status})
	}
}



module.exports = {
	insertDomain,
	updateDomain,
	deleteDomain,
	getDomain,
	getAllDomainsByUserId
}