const router = require('express').Router();


//model
const Folders = require('../model/Folders');

//common
const comFolder = require('../common/comFolder');


//Routes
//@Get All
router.get('/',(req,res)=>{
	Folders.find({})
		.then(folders => res.json(folders))
		.catch(err => res.status(404).send(err));
})

//@Get One
router.get('/:id',(req,res)=>{
	console.log(req.params.id)
	Folders.findById(req.params.id)
		.then(folder => res.json(folder))
		.catch(err => res.status(404).send(err));
})

//@Get Name One
router.get('/name/:name', (req, res) => {
	Folders.findOne({name:req.params.name})
		.then(folder => res.json(folder))
		.catch(err => res.status(404).send(err));
})


//@Post Add
router.post('/',(req,res)=>{
	comFolder
		.addFolder(req.body, (err, folder, msg) => {
			if(err){
				res.status(400).send(msg);
			}else{
				//pass
				let newFolder = new Folders ({
					name:folder.name,
					files:folder.files
				})
				//db save
				newFolder.save()
					.then(folder => res.json(folder))
					.catch(err => res.status(404).send(err));
			}
		})
})

//@Put Update
router.put('/:id',(req,res)=>{
	let id = { _id: req.params.id };
	let updateFolder = req.body;
	//update
	Folders.updateOne(id,updateFolder)
		.then(folder => res.json(folder))
		.catch(err => res.status(404).send(err));
})

//@Delete Del
router.delete('/:id',(req,res)=>{
	Folders.deleteOne({_id:req.params.id})
		.then(folder => res.json(folder))
		.catch(err => res.status(404).send(err));
})


//export
module.exports = router;