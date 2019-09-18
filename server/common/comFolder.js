const Folders = require('../model/Folders');

const addFolder = (reqBody,done) =>{
	let { name, files } = reqBody;

	if(!name) {
		return done(true, {}, 'please fill folder name');
	}

	//file
	if(files == undefined){
		files = [];
	}

	Folders.findOne({name})
		.then(folder =>{
			if(folder){
				done(true, {}, 'folder name is already used');
			}else{
				//pass
				done(false, { name, files }, 'pass');
			}
		})
}


module.exports = {
	addFolder
}