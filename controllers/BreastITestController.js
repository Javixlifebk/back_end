const breasttest = require("../models/BreastITestModel");
const { body, query, validationResult } = require("express-validator");
// const {sanitizeBody } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");

const addBreasttest = async (req, res) => {
  try {
    console.log("req new");
    console.log(req.body);
    let info = {
      lumps_checked: req.body.lumps_checked,
      lumps_right_breast: req.body.lumps_right_breast,
      lumps_right_cyclic: req.body.lumps_right_cyclic,
      lumps_left_breast: req.body.lumps_left_breast,
      lumps_left_cyclic: req.body.lumps_left_cyclic,

      niple_discharge_checked: req.body.niple_discharge_checked,
      niple_discharge_right_breast: req.body.niple_discharge_right_breast,
      niple_discharge_right_cyclic: req.body.niple_discharge_right_cyclic,
      niple_discharge_left_breast: req.body.niple_discharge_left_breast,
      niple_discharge_left_cyclic: req.body.niple_discharge_left_cyclic,

      niple_skin_checked: req.body.niple_skin_checked,
      niple_skin_right_breast: req.body.niple_skin_right_breast,
      niple_skin_right_cyclic: req.body.niple_skin_right_cyclic,
      niple_skin_left_breast: req.body.niple_skin_left_breast,
      niple_skin_left_cyclic: req.body.niple_skin_left_cyclic,

      swelling_checked: req.body.swelling_checked,
      swelling_right_breast: req.body.swelling_right_breast,
      swelling_right_cyclic: req.body.swelling_right_cyclic,
      swelling_left_breast: req.body.swelling_left_breast,
      swelling_left_cyclic: req.body.swelling_left_cyclic,

      rush_scaling_checked: req.body.rush_scaling_checked,
      rush_scaling_right_breast: req.body.rush_scaling_right_breast,
      rush_scaling_right_cyclic: req.body.rush_scaling_right_cyclic,
      rush_scaling_left_breast: req.body.rush_scaling_left_breast,
      rush_scaling_left_cyclic: req.body.rush_scaling_left_cyclic,

      breastPain_checked: req.body.breastPain_checked,
      breastPain_right_breast: req.body.breastPain_right_breast,
      breastPain_right_cyclic: req.body.breastPain_right_cyclic,
      breastPain_left_breast: req.body.breastPain_left_breast,
      breastPain_left_cyclic: req.body.breastPain_left_cyclic,

      note_breast_right: req.body.note_breast_right,
      note_breast_left: req.body.note_breast_left,
      ngoId: req.body.ngoId,
      caseId: req.body.caseId,
      screenerId: req.body.screenerId,
      citizenId: req.body.citizenId,
    };

    // console.log(req.body);
    console.log(info);
    const banner = await breasttest.create(info);

    res.status(200).send(banner);
    console.log(banner);
  } catch (err) {
    res.status(400).send(err);
  }
};


const getAllBreastTest = async (req, res, count) => {
  let getall = await breasttest.find({});

  res.status(200).send(getall);
};

const getByCaseId = async (req, res, count) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return apiResponse.validationErrorWithData(
        res,
        "Validation Error.",
        errors.array()
      );
    } else {
      var condition = {};
      if (
        req.body.caseId === "" ||
        req.body.caseId === undefined ||
        req.body.caseId === null
      ) {
        condition = {};
      } else {
        condition = { caseId: req.body.caseId };
      }
      breasttest
        .aggregate([
          { $match: condition },

          {
            $project: {
              screenerId: 1,
              caseId: 1,
              citizenId: 1,
              ngoId: 1,
              notes: 1,
              lumps_checked: 1,

              lumps_right_breast: {
                $cond: {
                  if: { $eq: ["$lumps_right_breast", 1] },
                  then: "Yes",
                  else: "No",
                },
              },
              lumps_right_cyclic: {
                $cond: {
                  if: { $eq: ["$lumps_right_cyclic", 1] },
                  then: "Yes",
                  else: "No",
                },
              },
              lumps_left_breast: {
                $cond: {
                  if: { $eq: ["$lumps_left_breast", 1] },
                  then: "Yes",
                  else: "No",
                },
              },
              lumps_left_cyclic: {
                $cond: {
                  if: { $eq: ["$lumps_left_cyclic", 1] },
                  then: "Yes",
                  else: "No",
                },
              },

              niple_discharge_checked: 1,
              niple_discharge_right_breast: {
                $cond: {
                  if: { $eq: ["$niple_discharge_right_breast", 1] },
                  then: "Yes",
                  else: "No",
                },
              },
              niple_discharge_right_cyclic: {
                $cond: {
                  if: { $eq: ["$niple_discharge_right_cyclic", 1] },
                  then: "Yes",
                  else: "No",
                },
              },
              niple_discharge_left_breast: {
                $cond: {
                  if: { $eq: ["$niple_discharge_left_breast", 1] },
                  then: "Yes",
                  else: "No",
                },
              },
              niple_discharge_left_cyclic: {
                $cond: {
                  if: { $eq: ["$niple_discharge_left_cyclic", 1] },
                  then: "Yes",
                  else: "No",
                },
              },

              niple_skin_checked: 1,
              niple_skin_right_breast: {
                $cond: {
                  if: { $eq: ["$niple_skin_right_breast", 1] },
                  then: "Yes",
                  else: "No",
                },
              },
              niple_skin_right_cyclic: {
                $cond: {
                  if: { $eq: ["$niple_skin_right_cyclic", 1] },
                  then: "Yes",
                  else: "No",
                },
              },
              niple_skin_left_breast: {
                $cond: {
                  if: { $eq: ["$niple_skin_left_breast", 1] },
                  then: "Yes",
                  else: "No",
                },
              },
              niple_skin_left_cyclic: {
                $cond: {
                  if: { $eq: ["$niple_skin_left_cyclic", 1] },
                  then: "Yes",
                  else: "No",
                },
              },

              swelling_checked: 1,
              swelling_right_breast: {
                $cond: {
                  if: { $eq: ["$swelling_right_breast", 1] },
                  then: "Yes",
                  else: "No",
                },
              },
              swelling_right_cyclic: {
                $cond: {
                  if: { $eq: ["$swelling_right_cyclic", 1] },
                  then: "Yes",
                  else: "No",
                },
              },
              swelling_left_breast: {
                $cond: {
                  if: { $eq: ["$swelling_left_breast", 1] },
                  then: "Yes",
                  else: "No",
                },
              },
              swelling_left_cyclic: {
                $cond: {
                  if: { $eq: ["$swelling_left_cyclic", 1] },
                  then: "Yes",
                  else: "No",
                },
              },
              rush_scaling_checked: 1,
              rush_scaling_right_breast: {
                $cond: {
                  if: { $eq: ["$rush_scaling_right_breast", 1] },
                  then: "Yes",
                  else: "No",
                },
              },
              rush_scaling_right_cyclic: {
                $cond: {
                  if: { $eq: ["$rush_scaling_right_cyclic", 1] },
                  then: "Yes",
                  else: "No",
                },
              },
              rush_scaling_left_breast: {
                $cond: {
                  if: { $eq: ["$rush_scaling_left_breast", 1] },
                  then: "Yes",
                  else: "No",
                },
              },
              rush_scaling_left_cyclic: {
                $cond: {
                  if: { $eq: ["$rush_scaling_left_cyclic", 1] },
                  then: "Yes",
                  else: "No",
                },
              },

              breastPain_checked: 1,
              breastPain_right_breast: {
                $cond: {
                  if: { $eq: ["$breastPain_right_breast", 1] },
                  then: "Yes",
                  else: "No",
                },
              },
              breastPain_right_cyclic: {
                $cond: {
                  if: { $eq: ["$breastPain_right_cyclic", 1] },
                  then: "Yes",
                  else: "No",
                },
              },
              breastPain_left_breast: {
                $cond: {
                  if: { $eq: ["$breastPain_left_breast", 1] },
                  then: "Yes",
                  else: "No",
                },
              },
              breastPain_left_cyclic: {
                $cond: {
                  if: { $eq: ["$breastPain_left_cyclic", 1] },
                  then: "Yes",
                  else: "No",
                },
              },
              note_breast_right: 1,
              note_breast_left: 1,
              ngoId: 1,
              caseId: 1,
              screenerId: 1,
              citizenId: 1,
            },
          },
        ])
        .then((users) => {
          let user = users[0];
          if (user) {
            return apiResponse.successResponseWithData(res, "Breast i Test Data fetch Successfully", users);
          } else return apiResponse.ErrorResponse(res, " Breast i Data Not Found");
        });
    }
  } catch (err) {
    return apiResponse.ErrorResponse(res, "EXp:" + err);
  }
};

module.exports = {
  addBreasttest,
  getAllBreastTest,
  getByCaseId,
};
