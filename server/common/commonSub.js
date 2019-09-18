const SubTitles = require('../model/SubTitles');

const addSubTitle = (reqBody,done) =>{
	const { name,subs } = reqBody;

	if(!name){
		return done(true, {}, 'please fill SubTitle field');
	}

	SubTitles.findOne({ name })
		.then(cate => {
			if(cate){
				done(true, {}, 'SubTitle name is already used');
			}else{
				//pass
				done(false, { name,subs }, 'pass');
			}
		})
}


module.exports = {
	addSubTitle
}