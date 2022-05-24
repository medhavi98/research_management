const stdFileUploadRouter = require('express').Router();
const FileUploadStd = require('../models/FileUploadStdtsModel');

stdFileUploadRouter.post("/",(req, res) => {
    const { templateFile } = req.body;
    console.log('templatefile',templateFile);

    const fileDetails = new FileUploadStd({
        templateFile
    });

    fileDetails.save().then(() => {
        res.json("File details are saved");
    }).catch((err) => {
        console.log({ status: "Error in saving file details", error: err.message });
    });
});

stdFileUploadRouter.get("/", async (req, res) => {
    await FileUploadStd.find().then((details) => {
        res.status(200).json(details);
    }).catch((err) => {
        console.log(err);
    });
});

stdFileUploadRouter.get("/:id", async (req, res) => {
    let fileId = req.params.id;

    await FileUploadStd.findById(fileId).then((details) => {
        res.status(200).send({ status: "Details are fetched", details});
    }).catch((err) => {
        res.send({ status: "Error in Fetching", err: err.message});
    });
});

stdFileUploadRouter.put("/:id", async (req, res) => {
    let fileId = req.params.id;

    const fileDetails = {
        templateFile: `http://localhost:5001/documents/${req.file.filename}`
    };

    await FileUploadStd.findByIdAndUpdate(fileId,fileDetails).then(() => {
        res.send({ status: "Files are updated"});
    }).catch((err) => {
        console.log(err);
    });
});

stdFileUploadRouter.delete("/:id", async (req, res) => {
    let fileId = req.params.id;

    await FileUploadStd.findOneAndDelete(fileId).then(() => {
        res.send({ status: "File Deleted"});
    }).catch((err) => {
        console.log(err);
    });
});

module.exports = stdFileUploadRouter;

