const path = require('path');
const fs = require('fs');

let url = path.join(__dirname, '../../public/uploads');


const fileCreate = (file,done) =>{
	const { name,mimetype,size } = file;

	//move file
	let fileType = mimetype.split('/');
	let date = Date.now();
	let fileName = (`${date}.${fileType[1]}`)
	//file move
	file.mv(`${url}/${fileName}`,(err,data)=>{
		if(err){
			done(true, {}, 'file move error');
		}else{
			//pass
			let dbFile = { name, filename: fileName, type: mimetype, size };
			done(false, dbFile, 'pass');
		}
	})
}

const fileDelete = (file,done) => {
	fs.unlink(`${url}/${file}`,(err)=>{
		done(err)
	})
}

module.exports = {
	fileCreate,
	fileDelete
}