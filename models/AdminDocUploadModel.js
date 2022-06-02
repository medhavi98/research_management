const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const docTemplateSchema = new Schema({
  templateFile: {
    type: String,
    required: true,
  },
  permissions: {
    type: [String],
    required: false,
  },
});

const AdminDocsModel = mongoose.model("adminDocuments", docTemplateSchema);

module.exports = AdminDocsModel;
