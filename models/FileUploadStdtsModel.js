const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const researchTemplateSchema = new Schema ({
    templateFile: {
        type: String,
        required: true,
      }
});

const researchPapers = mongoose.model(
    "UploadedResearchFile",researchTemplateSchema
);

module.exports = researchPapers;