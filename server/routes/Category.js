const router = require('express').Router();


//model
const Categorys = require('../model/Categorys');

//common
const comCategory = require('../common/comCategory');


//Routes
//@Get All
router.get('/',(req,res)=>{
	Categorys.find({})
		.then(folders => res.json(folders))
		.catch(err => res.status(404).send(err));
})

//@Get One
router.get('/:id',(req,res)=>{
	Categorys.findById(req.params.id)
		.then(folder => res.json(folder))
		.catch(err => res.status(404).send(err));
})


//@Post Add
router.post('/',(req,res)=>{
	comCategory
		.addCategory(req.body, (err, cate, msg) => {
			if(err){
				res.status(400).send(msg);
			}else{
				//pass
				let newCate = new Categorys ({
					name:cate.name,
					files:cate.files
				})
				//db save
				newCate.save()
					.then(cate => res.json(cate))
					.catch(err => res.status(404).send(err));
			}
		})
})

//@Put Update
router.put('/:id',(req,res)=>{
	let id = { _id: req.params.id };
	let updateFolder = req.body;

	//update
	Categorys.updateOne(id,updateFolder)
		.then(folder => res.json(folder))
		.catch(err => res.status(404).send(err));
})

//@Delete Del
router.delete('/:id',(req,res)=>{
	Categorys.deleteOne({_id:req.params.id})
		.then(folder => res.json(folder))
		.catch(err => res.status(404).send(err));
})


//export
module.exports = router;