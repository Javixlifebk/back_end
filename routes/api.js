var express = require("express");
var authRouter = require("./auth");
var ngoRouter = require("./ngo");
var citizenRouter = require("./citizen");
var docRouter = require("./doctor");
var loggedinRouter= require("./loggedin");
var screeningRouter= require("./screening");
var graphRouter = require("./graph");
var pharmacyRouter = require("./pharmacy");
var issues = require("./issues");
var misc = require("./misc");
var stub= require("./stub");
var requpdate= require("./requpdate");
var report = require("./report");
var labtest = require("./labtest");
var gsurvey = require("./generalSurvey");
var hsurvey = require("./healthSurvey");
var sesurvey = require("./socioeconomicsurvey");
var logo = require("./logoRouter");
var Jlogo = require("./JlogoRoute");
var breastItest = require("./BreastIRoute");
var createIndex = require("./CreateIndex");
var EzeRx = require("./EzeRx");

var app = express();

app.use("/auth/", authRouter);
app.use("/ngo/", ngoRouter);
app.use("/citizen/", citizenRouter);
app.use("/doctor/", docRouter);
app.use("/login/", loggedinRouter);
app.use("/screening/",screeningRouter);
app.use("/graph/", graphRouter);
app.use("/pharmacy/",pharmacyRouter);
app.use("/issues/",issues);
app.use("/stub/", stub);
app.use("/misc/",misc);
app.use("/requpdate/",requpdate);
app.use("/report/",report);
app.use("/labtest/",labtest);
app.use("/generalsurvey/",gsurvey);
app.use("/healthsurvey/",hsurvey);
app.use("/socioeconomicsurvey/",sesurvey);
app.use("/logo/",logo);
app.use("/Jlogo/",Jlogo);
app.use("/test/",breastItest);
app.use("/index/",createIndex);
app.use("/ezerx/",EzeRx);
module.exports = app;