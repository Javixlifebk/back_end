var express = require("express");

const IssuesController = require("../controllers/IssuesController");


var routerIssues = express.Router();
routerIssues.post("/addIssue", IssuesController.issueAdd);
routerIssues.post("/issuesByUser", IssuesController.issuesByUser);
routerIssues.post("/issuesAll", IssuesController.issuesAll);
routerIssues.post("/issuesUpdate", IssuesController.issueUpdate);
module.exports = routerIssues;