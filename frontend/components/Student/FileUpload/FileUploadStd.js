// import React, { Component } from "react";
// import { storage } from "../../firebase";
// import axios from "axios";

// export default class FileUploadStd extends Component { 
//     constructor(props){
//         super(props);
//         this.state = {
//             ResearchUploadFile: "",
//             researchTemplate: ""

//         };
//         this.submitResearchDoc = this.submitResearchDoc.bind(this);
//         this.saveResearchDoc = this.saveResearchDoc.bind(this);
//         this.handlerChange = this.handlerChange.bind(this);
//         this.handlerChangeFiles = this.handlerChangeFiles.bind(this);
//     }

//     submitResearchDoc() {
//         const researchDetails = {
//            templateFile: this.state.ResearchUploadFile 

//         };

//         axios.post(`http://localhost:5000/researchTemplate`,researchDetails).then(() => {
//             window.alert("File Uploaded!");
//         }).catch((err) => {
//             window.alert("FIle is not uploaded successfully");
//         });
//     }

//     saveResearchDoc() {
//         const { researchTemplate } = this.state;
//         const date = Date.now();
//         const uploadTaskTemp = storage.ref(`UploadedResearchFile/${date}_${researchTemplate.name}`).put(researchTemplate);

//         uploadTaskTemp.on("success_link_uploaded",(snapshot) => {},(err) => {console.log(err);}, () => {
//             storage.ref("UploadedResearchFile").child(`${date}_${researchTemplate.name}`).getDownloadURL().then((url) => {
//                 console.log(url);
//                 this.setState({ ResearchUploadFile: url});
//                 setTimeout(this.submitResearchDoc(),1000)
//             });
//         } );

//     }

//     handlerChange(e) {
//         this.setState({[e.target.name]: e.target.value});
//     }

//     handlerChangeFiles(e){
//         if(e.target.files[0]) {
//             this.setState({[e.target.name]: e.target.files});
//         }
//     }

//     render() {
//         return (
//             <div className="container">
//                 <h3>Document Submissions</h3>
//                 <input
//                   type={"file"}
//                   placeholder={"Enter Title"}
//                   name={"rTemplate"}
//                   onchange={this.handlerChangeFiles}
//                   id={"rTemplate"}
//                   fieldValue={"Template Title"}
//                 />
//             </div>
//         )}
// }
