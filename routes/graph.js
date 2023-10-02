var express = require("express");
const GraphController = require("../controllers/GraphController");

var routerGraph = express.Router();
routerGraph.post("/getlist", GraphController.listGraph);

routerGraph.post("/updatecaselist", GraphController.updateNgoIdAllcase);

module.exports = routerGraph;

  //     ScreeningCaseModel.ScreeningCase
                    //     .aggregate([
                    //   //   .countDocuments()
                    //   //   .then((sanyojika) => {
                    //   //     graph.push({ Sanyojika: sanyojika });
                    //   {
                    //     $lookup: {
                    //       localField: "screenerId",
                    //       from: "screeners",
                    //       foreignField: "screenerId",
                    //       as: "screeners",
                    //     },
                    //   },
                    //   {
                    //     $project: {
                    //       issubscreener: "$screeners.issubscreener",
                    //       isdeleted: 1,
                    //       ngoId:1
                    //     },
                    //   },
                    //   { $match: { issubscreener: 1 } },
                    //   { $match: { isdeleted: false ,'ngoId':req.body.ngoId} },
                
                    //   {
                    //     $count:
                    //       "issubscreener",
                    //   },
                    // ])
                    // .then(
                    //   (
                    //     issubscreener
                    //   ) => {
                    //     //console.dir(subscreeners);

                    //     if (
                    //       issubscreener[0]
                    //     )
                    //       graph.push({
                    //         sanyojika:
                    //           issubscreener[0]
                    //             .issubscreener,
                    //       });
                    //     else
                    //       graph.push({
                    //         sanyojika: 0,
                    //       });
                      //  .then((sanyojika) => {
                      //     graph.push({ Sanyojika: sanyojika });