const adminDocUploadRouter = require("express").Router();
const DocUploadAdmin = require("../models/AdminDocUploadModel");

adminDocUploadRouter.post("/", (req, res) => {
  const { templateFile, permissions, submissionTitle } = req.body;
  console.log("templatefile", templateFile);

  const fileDetails = new DocUploadAdmin({
    templateFile,
    submissionTitle,
    permissions,
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

adminDocUploadRouter.get("/getAllDoc", async (req, res) => {
  console.log("get");
  await DocUploadAdmin.find()
    .then((details) => {
      res.status(200).json(details);
    })
    .catch((err) => {
      console.log(err);
    });
});

adminDocUploadRouter.get("/getDocAdmin/:id", async (req, res) => {
  console.log("get id ", req.params.id);
  let fileId = req.params.id;

  await DocUploadAdmin.findById(fileId)
    .then((details) => {
      res.status(200).send({ status: "Details are fetched", details });
    })
    .catch((err) => {
      res.send({ status: "Error in Fetching", err: err.message });
    });
});

adminDocUploadRouter.get("/studentResources", async (req, res) => {
  console.log("dd");
  await DocUploadAdmin.find({ permissions: { $in: ["Student"] } })
    .then((details) => {
      console.log(details);
      res.status(200).json(details);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

adminDocUploadRouter.get("/staffResource", async (req, res) => {
  console.log("Staff Resource");
  await DocUploadAdmin.find({ permissions: { $in: ["Staff"] } })
    .then((details) => {
      console.log("details", details);
      res.status(200).json(details);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });

  // try {
  //   const details = await DocUploadAdmin.find({ permissions: ["Staff"] });
  //   console.log("details staff", details);
  //   res.status(200).json(details);
  // } catch (err) {
  //   res.status(500).json("cannot get staff resource", err);
  // }
});

adminDocUploadRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { submissionTitle, permissions } = req.body;
  console.log("submissionTitle, permissions", submissionTitle, permissions);

  await DocUploadAdmin.updateOne(
    { _id: id },
    {
      $set: { submissionTitle: submissionTitle },
      $set: { permissions: permissions },
    }
  )
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

adminDocUploadRouter.delete("/:id", async (req, res) => {
  let fileId = req.params.id;

  await DocUploadAdmin.findOneAndDelete(fileId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = adminDocUploadRouter;
