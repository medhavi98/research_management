const stdFileUploadRouter = require("express").Router();
const FileUploadStd = require("../models/FileUploadStdtsModel");
const GroupModel = require("../models/GroupModel");
const userDetails = require("../models/UserModel");

stdFileUploadRouter.post("/", (req, res) => {
  const { templateFile, id } = req.body;
  console.log("templatefile", templateFile, id);

  const fileDetails = new FileUploadStd({
    templateFile,
  });

  fileDetails
    .save()
    .then((result) => {
      console.log("result", result);
      userDetails
        .findOne({ _id: id })
        .then((resultTwo) => {
          console.log("result", resultTwo.groupIds[0]);
          GroupModel.updateOne(
            { _id: resultTwo.groupIds[0] },
            {
              $push: { groupDocuments: result._id },
            }
          )
            .then((successRes) => {
              res.status(200).json({ result, resultTwo, successRes });
            })
            .catch((err) => {
              console.log("error", err);
              res.status(500).json(err);
            });
        })
        .catch((err) => {
          console.log("error", err);
          res.status(500).json(err);
        });
    })
    .catch((err) => {
      console.log("Error in saving file details");
      res.status(500).json(err);
    });
});

stdFileUploadRouter.get("/", async (req, res) => {
  await FileUploadStd.find()
    .then((details) => {
      res.status(200).json(details);
    })
    .catch((err) => {
      console.log(err);
    });
});

stdFileUploadRouter.get("/:id", async (req, res) => {
  let fileId = req.params.id;

  await FileUploadStd.findById(fileId)
    .then((details) => {
      res.status(200).send({ status: "Details are fetched", details });
    })
    .catch((err) => {
      res.send({ status: "Error in Fetching", err: err.message });
    });
});

stdFileUploadRouter.put("/:id", async (req, res) => {
  let fileId = req.params.id;

  const fileDetails = {
    templateFile: `http://localhost:5001/documents/${req.file.filename}`,
  };

  await FileUploadStd.findByIdAndUpdate(fileId, fileDetails)
    .then(() => {
      res.send({ status: "Files are updated" });
    })
    .catch((err) => {
      console.log(err);
    });
});

stdFileUploadRouter.delete("/:id", async (req, res) => {
  let fileId = req.params.id;

  await FileUploadStd.findOneAndDelete(fileId)
    .then(() => {
      res.send({ status: "File Deleted" });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = stdFileUploadRouter;
