const Categorys = require('../model/Categorys');

const addCategory = (reqBody,done) =>{
	const { name } = reqBody;

	if(!name){
		return done(true, {}, 'please fill category field');
	}

	Categorys.findOne({name})
		.then(cate => {
			if(cate){
				done(true, {}, 'category name is already used');
			}else{
				//pass
				done(false, { name }, 'pass');
			}
		})
}


module.exports = {
	addCategory
}