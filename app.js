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
const config = require('./config');
const bodyParser = require('body-parser');
var app = express();
const ecgtest = require("./models/ECGTestModel");
const CitizenModel = require("./models/CitizenModel");

//All below code is new for AWS

const { S3Client, PutObjectCommand, ListObjectsCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs')


// Configure AWS SDK
const s3Client = new S3Client({
	region: config.region,
	credentials: {
		accessKeyId: config.accessKeyId,
		secretAccessKey: config.secretAccessKey,
	},
});



//For uploading documents on AWS

const aws_documents_storage = multer.memoryStorage();

const upload_documents_on_AWS = multer({ storage: aws_documents_storage })

// Define a route for handling file uploads
app.post('/aws_document_upload', upload_documents_on_AWS.single('document'), async (req, res) => {
	try {
		const file = req.file;

		console.log("I am here in aws_document_upload")
		console.log("ecg req",req)
		console.log("ecg req.body",req.body)
		caseId= req.body.caseId;
		let info = {
			ngoId: req.body.ngoId,
			caseId: req.body.caseId,
			screenerId: req.body.screenerId,
			citizenId: req.body.citizenId,
		  };

		let info_update = {
		ngoId: req.body.ngoId,
		// caseId: req.body.caseId,
		screenerId: req.body.screenerId,
		citizenId: req.body.citizenId,
		};
	  
		  // console.log(req.body);
		// try {
		//   var ecg_test_perform =await  ecgtest.find({ caseId: caseId});
		// } catch (error) {
		// 	console.error("Error downloading or merging PDF:", error);
		// }
		
		// if (ecg_test_perform.length >0) {
		// 	var ecg_test_perform = await  ecgtest.update({ caseId: caseId},{$set:info_update})
		// } else {
			ecgtest.create(info);
			
		// }


		  

		// Read the file content from the buffer
		const fileContent = file.buffer;

		const folderPath = 'userDocuments/ecgTest/';

		const uploadParams = {
			Bucket: "javixtest",
			Key: folderPath + file.originalname,
			Body: fileContent,
		};

		const command = new PutObjectCommand(uploadParams);
		await s3Client.send(command);
		
	  

		res.send('Image uploaded successfully');
	} catch (error) {
		console.error(error);
		res.status(500).send('An error occurred during image upload');
	}
});


// Define a route for fetching all documents from S3
app.get('/findDocuments', async (req, res) => {
	try {
		const bucketName = 'javixtest';

		const listObjectsParams = {
			Bucket: bucketName,
			Prefix: 'userDocuments/ecgTest/',
		};

		const command = new ListObjectsCommand(listObjectsParams);
		const response = await s3Client.send(command);

		const documents = response.Contents;

		// Respond with the list of documents
		res.status(200).send(documents);
	} catch (error) {
		console.error('Error fetching documents from S3:', error);
		res.status(500).json({ error: 'An error occurred while fetching documents from S3' });
	}
});



// Define a route for fetching a single document from S3
app.get('/findDocument/:filename', async (req, res) => {
	try {
		const bucketName = 'javixtest';

		const listObjectsParams = {
			Bucket: bucketName,
			Prefix: 'userDocuments/ecgTest/' + req.params.filename,
		};

		const command = new ListObjectsCommand(listObjectsParams);
		const response = await s3Client.send(command);

		const documents = response.Contents;

		// Respond with the list of documents
		res.status(200).send(documents);
	} catch (error) {
		console.error('Error fetching documents from S3:', error);
		res.status(500).json({ error: 'An error occurred while fetching documents from S3' });
	}
});

// Define a route for downloading a file from S3
app.get('/download/:filename', async (req, res) => {
	try {
		const bucketName = 'javixtest';
		const filePath = 'userDocuments/ecgTest/' + req.params.filename; // The file path within the bucket

		const downloadParams = {
			Bucket: bucketName,
			Key: filePath,
		};

		const command = new GetObjectCommand(downloadParams);
		const response = await s3Client.send(command);

		response.Body.pipe(res);

		res.setHeader('Content-Disposition', `attachment; filename="${req.params.filename}"`);
		res.setHeader('Content-Type', response.ContentType);
	} catch (error) {
		console.error('Error downloading file from S3:', error);
		res.status(500).json({ error: 'An error occurred while downloading the file from S3' });
	}
});

//All above code is new for AWS

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


 var mongoose = require("mongoose");

mongoose.connect(config.databaseUrl,{ useNewUrlParser: true, useUnifiedTopology: true ,useFindAndModify: false});
var db = mongoose.connection;


app.use(cors());

//don't show the log when it is test
if(process.env.NODE_ENV !== "test") {
	app.use(logger("dev"));
}
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '100mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json())

app.use(cookieParser());
//------------------Image & Documents Routes------------
app.use('/profile',express.static('./uploads/images'));
app.use('/videos',express.static('./uploads/videos17012023'));
app.use('/documents',express.static('./uploads/documents'));
app.use('/apps',express.static('./uploads/apps'));
app.use('/reports',express.static('./uploads/delete_created_files/'));
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
const uploadab = multer({ storage });
app.post('/upload/profile/:citizenId', uploadab.single('photo'), async (req, res) => {
	const { citizenId } = req.params;
  
	try {
	  const user = await CitizenModel.CitizenDetails.findOne({ citizenId });
  
	  if (!user) {
		return res.status(400).json({
		  success: 0,
		  error: 'Invalid citizenId',
		});
	  }
  
	  if (user.photo) {
		const oldPhotoPath = user.photo;
		const relativeOldPhotoPath = oldPhotoPath.replace('http://18.60.238.252:3010/profile/', '');
		const oldPhotoFilePath = path.join(__dirname, 'uploads', relativeOldPhotoPath);
  
		console.log('Old Photo Information:');
		console.log('Old Photo Path:', oldPhotoPath);
		console.log('Relative Old Photo Path:', relativeOldPhotoPath);
		console.log('Old Photo File Path:', oldPhotoFilePath);
  
		try {
		  // Use the asynchronous version of fs.exists
		  await fs.access(oldPhotoFilePath);
		  // If the access operation succeeds, the file exists
		  fs.unlink(oldPhotoFilePath);
		  console.log('Old photo deleted successfully');
		} catch (error) {
		  // If the access operation fails, the file does not exist
		  console.log('Old photo does not exist');
		}
	  }
  
	  const newPhotoPath = `http://18.60.238.252:3010/profile/${req.file.filename}`;
	  console.log('New Photo Information:');
	  console.log('New Photo Path:', newPhotoPath);
  
	  user.photo = newPhotoPath;
	  await user.save();
  
	  return res.json({
		success: 1,
		'profile-url': newPhotoPath,
		citizenId: citizenId,
	  });
	} catch (error) {
	  console.error('Error updating user photo:', error);
	  return res.status(500).json({
		success: 0,
		error: 'Failed to update user photo in the database',
	  });
	}
  });


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
		'profile-url':'http://18.60.238.252:3010/profile/'+req.file.filename
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
		'url':'http://18.60.238.252:3010/documents/'+req.file.filename
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

//
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
