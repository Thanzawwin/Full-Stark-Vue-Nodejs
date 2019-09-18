const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');

//init
const app = express();


//cors
app.use(cors());

//file upload
app.use(fileUpload());

//db
const db = require('./server/config/keys').mongoURI;
mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log('mongodb connected'))
	.catch(err => console.log('mongodb connect error'));

//static folder
app.use(express.static(path.join(__dirname, 'public')));	

//middle ware	
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routes
app.use('/api/post', require('./server/routes/Post'));
app.use('/api/folder', require('./server/routes/Folder'));
app.use('/api/file', require('./server/routes/File'));
app.use('/api/category', require('./server/routes/Category'));
app.use('/api/sub-title', require('./server/routes/SubTitle'));

//if productions
app.get('*',(req,res)=>{
	res.sendFile(path.join(__dirname, '/public/index.html'));
})


//server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));