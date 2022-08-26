const express = require('express');
const multer = require('multer');


const upload = multer({
  dest: 'uploads/profiles/' // this saves your file into a directory called "uploads"
}); 


