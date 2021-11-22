const { Domain } = require('../../services/db/models')

const createDomain = async ({domain, userId, bckColor, primaryColor, fontColor}) => {
	try {
		const domainFind = await Domain.find({domain})
		if(domainFind.length > 0) {
			return Promise.reject({message: 'Domain already exists', status: 409})
		}

		const newDomain = await Domain.insertMany([{domain, userId, bckColor, primaryColor, fontColor}])
		return newDomain[0]
	} catch (e) {
		return Promise.reject({message: 'Server internal error', status: 500})
	}
}

const updateDomainById = async ({id, domain, bckColor, primaryColor, fontColor, userId}) => {
	try {
		let updatedFields = {}
		if (!id.match(/^[0-9a-fA-F]{24}$/)) {
			return Promise.reject({message: 'Not valid id', status: 404})
		} 
		const domainObj = await Domain.findById(id)

		if(!domainObj) {
			return Promise.reject({message: 'Domain not found', status: 404})
		}
		if(!domainObj.userId.equals(userId)) {
			return Promise.reject({message: 'Not authorized to update the domain of another user', status: 401})
		}
		
		if(domain) {
			const domainFind = await Domain.find({domain})
			if(domainFind.length > 0) {
				if(!domainFind[0].userId.equals(userId)) {
					return Promise.reject({message: 'Domain already exists', status: 409})
				}
			}
			updatedFields.domain = domain
		}
		if(bckColor){
			updatedFields.bckColor = bckColor
		}
		if(primaryColor){
			updatedFields.primaryColor = primaryColor
		}
		if(fontColor){
			updatedFields.fontColor = fontColor
		}
		
		const res = await Domain.updateOne({_id:id }, updatedFields)
		return res
	} catch (e) {
		console.log(e)
		return Promise.reject({message: 'Server internal error', status: 500})
	}
}

const destroyDomainById = async ({id, userId}) => {
	try {
		if (!id.match(/^[0-9a-fA-F]{24}$/)) {
			return Promise.reject({message: 'Not valid id', status: 404})
		} 
		const domainObj = await Domain.findById(id)
		if(!domainObj) {
			return Promise.reject({message: 'Domain not found', status: 404})
		}
		
		if(!domainObj.userId.equals(userId)) {
			return Promise.reject({message: 'Not authorized to delete the domain of another user', status: 401})
		}

		const res = await Domain.deleteOne({_id: id})
		return res
	} catch (e) {
		console.log(e)
		return Promise.reject({message: 'Server internal error', status: 500})
	}
}

const getDomainById = async({id}) => {
	try {
		if (!id.match(/^[0-9a-fA-F]{24}$/)) {
			return Promise.reject({message: 'Not valid id', status: 400})
		} 
		const domainObj = await Domain.findById(id)
		if(!domainObj) {
			return Promise.reject({message: 'Domain not found', status: 404})
		}
		return domainObj
	} catch (e) {
		console.log(e)
		return Promise.reject({message: 'Server internal error', status: 500})
	}
}

const getDomainsFromUserId = async ({userId}) => {
	try {
		const domainFind = await Domain.find({userId})
		return domainFind
	} catch (e) {
		console.log(e)
		return Promise.reject({message: 'Server internal error', status: 500})
	}
}


module.exports = {
	createDomain,
	updateDomainById,
	destroyDomainById,
	getDomainById,
	getDomainsFromUserId
}