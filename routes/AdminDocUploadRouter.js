const adminDocUploadRouter = require("express").Router();
const DocUploadAdmin = require("../models/AdminDocUploadModel");

adminDocUploadRouter.post("/", (req, res) => {
  const { templateFile } = req.body;
  console.log("templatefile", templateFile);

  const fileDetails = new DocUploadAdmin({
    templateFile,
  });

  fileDetails
    .save()
    .then(() => {
      res.status(200).json("File details are saved");
    })
    .catch((err) => {
      console.log({
        status: "Error in saving file details",
        error: err.message,
      });
      res.status(500).json("Error in saving file details");
    });
});

adminDocUploadRouter.get("/", async (req, res) => {
  await DocUploadAdmin.find()
    .then((details) => {
      res.status(200).json(details);
    })
    .catch((err) => {
      console.log(err);
    });
});

adminDocUploadRouter.get("/:id", async (req, res) => {
  let fileId = req.params.id;

  await DocUploadAdmin.findById(fileId)
    .then((details) => {
      res.status(200).send({ status: "Details are fetched", details });
    })
    .catch((err) => {
      res.send({ status: "Error in Fetching", err: err.message });
    });
});

adminDocUploadRouter.put("/:id", async (req, res) => {
  let fileId = req.params.id;

  const fileDetails = {
    templateFile: `http://localhost:5001/documents/${req.file.filename}`,
  };

  await DocUploadAdmin.findByIdAndUpdate(fileId, fileDetails)
    .then(() => {
      res.send({ status: "Files are updated" });
    })
    .catch((err) => {
      console.log(err);
    });
});

adminDocUploadRouter.delete("/:id", async (req, res) => {
  let fileId = req.params.id;

  await DocUploadAdmin.findOneAndDelete(fileId)
    .then(() => {
      res.send({ status: "File Deleted" });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = adminDocUploadRouter;
