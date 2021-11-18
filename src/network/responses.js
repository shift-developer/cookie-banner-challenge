const errorResponse = ({ res, message, status}) => {
	return res.status(status || 500).json({
		success: false,
		message
	})
}


module.exports = {
	errorResponse
}