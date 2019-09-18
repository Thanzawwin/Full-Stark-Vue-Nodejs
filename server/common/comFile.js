const Files = require('../model/Files');

const addFile = (reqFile,done) =>{
	//file check
	if(reqFile == undefined){
		return done(true, {}, 'Not Found File');
	}

	const files = reqFile.files;

	if(files.length > 0){
		//multiple file
		files.forEach(file => {
			done(false,file, 'multiple files');

		})

	}else if(files){
		Files.findOne({name:files.name})
			.then(name => {
				if(name){
					done(true, {}, 'this file is already here');
				}else{
					//pass
					//one file
					done(false, files, 'one file');
				}
			})
		
	}else{
		//no file
		console.log('no file')
	}
}


//export 
module.exports = {
	addFile
}