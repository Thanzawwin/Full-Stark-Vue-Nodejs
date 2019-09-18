const router = require('express').Router();


//model
const Files = require('../model/Files');

//common
const comFile = require('../common/comFile');
const FileSys = require('../common/FileSys');


//Routes
//@Get All
router.get('/',(req,res)=>{
	Files.find({})
		.then(files => res.json(files))
		.catch(err => res.status(404).send(err));
})

//@Get One
router.get('/:id',(req,res)=>{
	Files.findById(req.params.id)
		.then(file => res.json(file))
		.catch(err => res.status(404).send(err));
})


//@Post Add
router.post('/',(req,res)=>{
	comFile
		.addFile(req.files,(err,reqFile,msg)=>{
			if(err){
				res.status(400).send(msg);
			}else{
				FileSys
					.fileCreate(reqFile,(err,file,msg)=>{
						if(err){
							res.status(400).send(msg);
						}else{
							//pass
							let newFile = new Files({
								name:file.name,
								filename:file.filename,
								size:file.size,
								type:file.type
							})
							//save
							newFile.save()
								.then(file => res.json(file))
								.catch(err => res.status.send(err));
						}
					})
			}
		})
})

//@Put Update
router.put('/:id',(req,res)=>{
	let id = { _id: req.params.id };
	let updateFile = req.body;

	//update
	Files.updateOne(id,updateFile)
		.then(file => res.json(file))
		.catch(err => res.status(404).send(err));
})

//@Delete Del
router.delete('/:id',(req,res)=>{
	Files.findById(req.params.id)
		.then(file => {
			//delete file
			FileSys
				.fileDelete(file.filename,(err)=>{
					if(err){
						res.status(404).send('File Delete Error');
					}//delete db
					Files.deleteOne({_id:req.params.id})
						.then(file => res.json(file))
						.catch(err => res.status(404).send(err));
				})
		})
	
})


//export
module.exports = router;