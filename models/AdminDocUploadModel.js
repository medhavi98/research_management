const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const docTemplateSchema = new Schema({
  templateFile: {
    type: String,
    required: true,
  },
  submissionTitle: {
    type: String,
    required: true,
  },
  permissions: {
    type: [String],
    required: true,
  },
});

const AdminDocsModel = mongoose.model("adminDocuments", docTemplateSchema);

module.exports = AdminDocsModel;
