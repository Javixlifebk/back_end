var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
var lipidcriticalSchema = new mongoose.Schema(
  {
    citizenId:{type: String, required: true},
    FirstName:{type: String, required: true},
    ngoId :{type:String,required:false},
    LastName:{type: String, required: true},
    Email:{type: String, required: true},
    Gender:{type: String, required: true},
    Address:{type: String, required: true},
    ScreenerId:{type: String, required: true},
    ScreenerFirstName:{type: String, required: true},
    ScreenerLastName:{type: String, required: true},
    Mobile:{type: String, required: true},
    Age:{type: String, required: true}

  },
  { timestamps: true }
);
var lipidcritical = mongoose.model("lipidcritical", lipidcriticalSchema);
module.exports = lipidcritical;
