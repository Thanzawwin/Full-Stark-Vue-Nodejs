const mongoose = require('mongoose');

const subTitleSchema = new mongoose.Schema ({
	name: {
		type:String,
		required:true
	},
	subs:{
		type:[]
	},
	date: {
		type:Date,
		default:Date.now
	}
})


module.exports = mongoose.model('SubTitles', subTitleSchema);