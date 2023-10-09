const CitizenModel = require("../models/CitizenModel");
const fs = require("fs");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
// Image Upload
const multer = require("multer");
const path = require("path");

const UpdateProfile = async (req, res) => {
  const { citizenId } = req.params;
  try {
    const user = await CitizenModel.CitizenDetails.findOne({ citizenId });

    if (!user) {
      return apiResponse.validationErrorWithData(res, "Validation Error.", [
        { msg: "Invalid citizenId" },
      ]);
    }
    // Check if a new photo was uploaded
    if (req.file) {
      // Use an asynchronous method to remove the old photo if it exists
      if (user.photo) {
        try {
          // Construct the correct file path for the old photo
          const oldPhotoPath = path.join(
            __dirname,
            "..",
            "./uploads/images/profile",
            path.basename(user.photo)
          );
          await fs.promises.unlink(oldPhotoPath);
        } catch (err) {
          // Handle any unlink errors (e.g., file not found)
          console.error("Error deleting old photo:", err);
        }
      }

      // Update the user's photo path with a relative path
      const newPhotoPath = `./uploads/images/profile/${req.file.filename}`;

      // Construct the complete URL for the response
      const profileUrl = `https://javixlife.org/${newPhotoPath}`;

      // Store the complete URL in the database
      user.photo = profileUrl;

      // Save the updated user with the new complete photo URL
      const updatedUser = await user.save();

      res.json({
        success: 1,
        "profile-url": profileUrl,
      });
    } else {
      // Save the updated user without a new photo
      const updatedUser = await user.save();

      return apiResponse.successResponseWithData(res, "Success", updatedUser);
    }
  } catch (err) {
    return apiResponse.ErrorResponse(res, "Error: " + err.message);
  }
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define the destination folder for file uploads
    cb(null, "./uploads/images/profile/"); // You need to create the 'uploads' directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = "profile" + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1 MB limit
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Invalid file format. Supported formats: jpeg, jpg, png, gif");
  },
}).single("photo");

module.exports = {
  UpdateProfile,
  upload,
};
