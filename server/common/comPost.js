const Posts = require('../model/Posts');

const addPost = (reqBody,done) =>{
	let { title,author,body,category,file } = reqBody;

	//all 
	if(!title || !author || !body ){
		return done(true, {}, 'please fill in required all fields');
	}

	if(category == undefined){
		category = 'unknown';
	}

	if(file == undefined){
		file = 'unknown';
	}

	Posts.findOne({title})
		.then(post => {
			if(post){
				done(true, {}, 'post title already used && please choose another title');
			}else{
				//pass
				done(false, { title, author, body, category,file }, 'pass');
			}
		})
}

//export 
module.exports = {
	addPost
}