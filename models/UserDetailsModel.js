var mongoose = require("mongoose");

var UserDetailsSchema = new mongoose.Schema({
	userId: {type: String, required: true, index: true},
	ngoId :{type:String,required:false},
	isBlocked: {type: Boolean, required: true, default: 0},
	isExpired: {type: Boolean, required: true, default: 0},
	isUnActive: {type: Boolean, required: true, default: 0},
	email: {type: String},
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	phoneNo: {type: String},
	phoneNo1: {type: String, required: false},
	logo:{type: String, required: false},
	client_logo:{type: String, required: false},
	
}, {timestamps: true});

// Virtual for user's full name
UserDetailsSchema
	.virtual("fullName")
	.get(function () {
		return this.firstName + " " + this.lastName;
	});


var counter = mongoose.model("UserDetails", UserDetailsSchema);;



var entitySchema = mongoose.Schema({
    sort: {type: Number}
});

entitySchema.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdateAsync({userId: 'entityId'}, {$inc: { seq: 1} }, {new: true, upsert: true}).then(function(count) {
        doc.sort = count.seq;
        next();
    })
    .catch(function(error) {
        console.error("counter error-> : "+error);
        throw error;
    });
});


module.exports = counter;
