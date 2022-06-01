const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const docTemplateSchema = new Schema(
  {
    templateFile: {
      type: String,
      required: true,
    },
    permissions: {
      type: [String],
      required: true,
    },
  },
  { collection: "adminDocuments" }
);

const AdminDocsModel = mongoose.model("AdminDocsModel", docTemplateSchema);

module.exports = AdminDocsModel;
