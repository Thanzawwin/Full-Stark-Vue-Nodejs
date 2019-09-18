const router = require('express').Router();

//model
const SubTitles = require('../model/SubTitles');
//common
const common = require('../common/commonSub');

//Routes
//@Get All
router.get('/',(req,res)=>{
	SubTitles.find({})
		.then(subTitles => res.json(subTitles))
		.catch(err => res.status(404).send(err));
})

//@Get One
router.get('/:id',(req,res)=>{
	SubTitles.findById(req.params.id)
		.then(title => res.json(title))
		.catch(err => res.status(404).send(err));
})

//@Post Add
router.post('/',(req,res)=>{

	common
		.addSubTitle(req.body, (err, sub, msg) => {
			if (err) {
				res.status(400).send(msg);
			} else {
				//pass
				const { name, subs } = sub;
				let newSub = new SubTitles({
					name,
					subs
				})
				//db save
				newSub.save()
					.then(cate => res.json(cate))
					.catch(err => res.status(404).send(err));
			}
		})
})

//@Put Update
router.put('/:id',(req,res)=>{
	let id = { _id: req.params.id };
	let updateSub = req.body;

	//update
	SubTitles.updateOne(id,updateSub)
		.then(title => res.json(title))
		.catch(err => res.status(404).send(err));
})

//@Delete Del
router.delete('/:id',(req,res)=>{
	SubTitles.deleteOne({_id:req.params.id})
		.then(title => res.json(title))
		.catch(err => res.status(404).send(err));
})


//export
module.exports = router;