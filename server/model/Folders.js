const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema ({
	name: {
		type:String,
		required:true
	},
	files: {
		type: []
	},
	date: {
		type:Date,
		default:Date.now
	}
})


module.exports = mongoose.model('Folders', folderSchema);