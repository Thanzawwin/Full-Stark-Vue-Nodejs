const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema ({
	name: {
		type:String,
		required:true
	},
	filename: {
		type: String,
		required: true
	},
	size: {
		type: Number,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	date: {
		type:Date,
		default:Date.now
	}
})


module.exports = mongoose.model('Files', fileSchema);