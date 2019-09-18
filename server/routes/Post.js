const router = require('express').Router();


//model
const Posts = require('../model/Posts');

//common
const comPost = require('../common/comPost');


//Routes
//@Get All
router.get('/',(req,res)=>{
	Posts.find({})
		.then(posts => res.json(posts))
		.catch(err => res.status(404).send(err));
})

//@Get One
router.get('/:id',(req,res)=>{
	Posts.findById(req.params.id)
		.then(post => res.json(post))
		.catch(err => res.status(404).send(err));
})


//@Post Add
router.post('/',(req,res)=>{
	console.log(req.body)
	comPost
		.addPost(req.body,(err,post,msg)=>{
			if(err){
				res.status(400).send(msg);
			}else{
				//pass
				let newPost = new Posts ({
					title:post.title,
					author:post.author,
					body:post.body,
					category:post.category,
					file:post.file
				})
				//db save
				newPost.save()
					.then(posts => res.json(posts))
					.catch(err => res.status(404).send(err));
			}
		})
})

//@Put Update
router.put('/:id',(req,res)=>{
	let id = { _id: req.params.id };
	let updatePost = req.body;

	//update
	Posts.updateOne(id,updatePost)
		.then(post => res.json(post))
		.catch(err => res.status(404).send(err));
})

//@Delete Del
router.delete('/:id',(req,res)=>{
	Posts.deleteOne({_id:req.params.id})
		.then(post => res.json(post))
		.catch(err => res.status(404).send(err));
})


//export
module.exports = router;