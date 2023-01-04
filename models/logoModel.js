
var mongoose = require("mongoose");
//var autoIncrement = require('mongoose-auto-increment');
mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
var LogoSchema = new mongoose.Schema({

                image: {
                     type:String
                },
                client_logo: {
                    type:String
                     },
                ngoId: {
                    type:String
                },

                
            }, {timestamps: true});

// module.exports =  {Logo}

module.exports.Logo = mongoose.model("logo", LogoSchema);