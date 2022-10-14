var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
var indexRouter = require("./routes/index");
var apiRouter = require("./routes/api");
var apiResponse = require("./helpers/apiResponse");
var cors = require("cors");
const multer = require('multer');
//Test changes 

const storage = multer.diskStorage({
	destination : './uploads/images',
	filename : (req,file,cb)=>{
		
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
})


const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|mp4|MP4|webm|WebM|mkv|3gp|3GP)$/)) {
        req.fileValidationError = 'Only Image/Video files are allowed!';
        return cb(new Error('Only Image/Video files are allowed!'), false);
    }
    cb(null, true);
};

const storage1 = multer.diskStorage({
	destination : './uploads/documents',
	filename : (req,file,cb)=>{
		
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
})


const imageFilter1 = function(req, file, cb) {
    // Accept all
    
    cb(null, true);
};

const upload = multer({
  storage : storage,
  fileFilter: imageFilter
});

const upload1 = multer({
  storage : storage1,
  fileFilter: imageFilter1
});


// DB connection
// var MONGODB_URL ='mongodb://admin123:Jzfq2n6b4n15@localhost:27017/javix?authMechanism=DEFAULT';
// DATA = “mongodb://admin:admin@localhost:27017/ais_mlm?authSource=admin”
// var MONGODB_URL='mongodb://admin123:Jzfq2n6b4n15@localhost:27017/javix'

 var mongoose = require("mongoose");

// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set();
// mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true,useFindAndModify:false}).then(() => {
	//don't show the log when it is test
// 	if(process.env.NODE_ENV !== "test") {
	
// 	}
// })
	// .catch(err => {
	// 	console.error("App starting error:", err.message);
	// 	process.exit(1);
	// });

mongoose.connect('mongodb://admin123:Jzfq2n6b4n15@localhost:27017/javix');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("h");
});

// exports.test = function(req,res) {
//   console.log(res)
// };
// var db = mongoose.connection;


var app = express();
app.use(cors());

//don't show the log when it is test
if(process.env.NODE_ENV !== "test") {
	app.use(logger("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use('/profile',express.static('./uploads/images'));
app.use('/documents',express.static('./uploads/documents'));
app.use('/apps',express.static('./uploads/apps'));
app.use('/reports',express.static('./uploads/'));
app.use(express.static(path.join(__dirname, "public")));

// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');


//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });
//To allow cross-origin requests


//Upload Profile pic

app.post('/upload/profile', (req, res) => {
    
    let upload = multer({ storage: storage, fileFilter: imageFilter }).single('profile');

    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
        	res.json({
			'success':0,
			'error':req.fileValidationError
			})
            
        }
        else if (!req.file) {
        	res.json({
			'success':0,
			'error':'Please select an image to upload'
			})
            
        }
        else if (err instanceof multer.MulterError) {
            res.json({
			'success':0,
			'error':err
			})
        }
        else if (err) {
             res.json({
			'success':0,
			'error':err
			})
        }
        else{

        // Display uploaded image for user validation

       
        if(req.file!=undefined && req.file!=null && req.file!=""){
        res.json({
		'success':1,
		'profile-url':'http://143.244.136.145:3010/profile/'+req.file.filename
		})
    }else{
    	res.json({
			'success':0,
			'error':'No file Found'
			})
    }
}
	});
});

app.post('/upload/documents', (req, res) => {
    
    let upload1 = multer({ storage: storage1, fileFilter: imageFilter1 }).single('document');

    upload1(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
        	res.json({
			'success':0,
			'error':req.fileValidationError
			})
            
        }
        else if (!req.file) {
        	res.json({
			'success':0,
			'error':'Please select an document to upload'
			})
            
        }
        else if (err instanceof multer.MulterError) {
            res.json({
			'success':0,
			'error':err
			})
        }
        else if (err) {
             res.json({
			'success':0,
			'error':err
			})
        }
        else{

        // Display uploaded image for user validation

       
        if(req.file!=undefined && req.file!=null && req.file!=""){
        res.json({
		'success':1,
		'url':'http://143.244.136.145:3010/documents/'+req.file.filename
		})
    }else{
    	res.json({
			'success':0,
			'error':'No file Found'
			})
    }
}
	});
});





//Route Prefixes
app.use("/", indexRouter);
app.use("/api/", apiRouter);

// throw 404 if URL not found
app.all("*", function(req, res) {
	return apiResponse.notFoundResponse(res, "Page not found");
});

app.use((err, req, res) => {
	if(err.name == "UnauthorizedError"){
		return apiResponse.unauthorizedResponse(res, err.message);
	}
});

module.exports = app;
