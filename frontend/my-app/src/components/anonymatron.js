import axios from 'axios';
import React, { Component } from 'react';
// import Alert from 'react-bootstrap/Alert';  
// import { navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
class UploadFile extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      datasetLink: "",
      isPolicyUpload: true,
      error: "",
      selectedFile: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // On file select (from the pop up)
  onFileChange = event => {
    this.setState({ error: "" })
    this.setState({ selectedFile: event.target.files[0] });
  };

  // onFileUpload = () => {

  //   // Create an object of formData
  //   const formData = new FormData();

  //   // Update the formData object
  //   formData.append(
  //     "myFile",
  //     this.state.selectedFile,
  //     this.state.selectedFile.name
  //   );

  //   // Details of the uploaded file
  //   console.log(this.state.selectedFile);

  //   // Request made to the backend api
  //   // Send formData object
  //   axios.post("api/uploadfile", formData);
  // };

  // On file upload (click the upload button)
  redirectfunc = () => {
    this.setState({ error: "" })

    console.log("called")
    if (this.state.selectedFile) {
      const formData = new FormData();

      // Update the formData object
      formData.append(
        "myFile",
        this.state.selectedFile,
        this.state.selectedFile.name
      );

      // Details of the uploaded file
      console.log(this.state.selectedFile);
      console.log(formData);

      // Request made to the backend api
      // Send formData object
      axios.post("http://localhost:5000/anontool", formData).then(()=>{
        window.open('preview',"_self")
      });
    }
    else {
      console.log("called2")
      this.setState({ error: "Please select a file before submitting" })
      console.log("called3")
      console.log()

    }
  }

  goback = () => {
    window.open('/home',"_self")
  }
    // File content to be displayed after
  // file upload is complete
  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
        </div>
      );
    } else {
      // addToast("Please select file before uploading!", { appearance: 'error' });
      return (

        <div class="alert alert-warning alert-dismissible fade show" role="alert">
          This is a primary alert—check it out!
        </div>);
    }
  };
  tempFunc = () => {
    this.setState({ error: "" })
    if (this.state.isPolicyUpload === true) {
      this.setState({ isPolicyUpload: false });
    }
    else {
      this.setState({ isPolicyUpload: true })
    }
  }

  handleChange(event) {
    console.log("called")
    console.log(event)
    this.setState({ datasetLink: event.target.value });
  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.datasetLink);
    event.preventDefault();
  }


  render() {

    return (
      <div className='container-fluid'>
        {/* <div style={{display:'none'}}>
          <button id="btn1">        <Link to="/preview">Home</Link></button>
        </div> */}
        <div className='sidebar'>
          <h1 className='heading1'>DATA</h1>
          <h1 className='heading2'>ANONYMIZATION</h1>
        </div>
        <div className="sec_frame">
            {/* <nav className="navbar"> */}
                <button className="back" onClick={this.goback}>
                  {"<<"}
                </button>
            {/* </nav> */}
        </div>

        <div className='main'>

          <div className='parent' style={{ display: this.state.isPolicyUpload ? 'block' : "none" }}>
            <h1>
              Please Upload the XML file for Anonymatron
            </h1>
            <br></br>
            <input className="inputfile" type="file"  accept="text/xml"  onChange={this.onFileChange} />
            <br></br>
            <br></br>
            <button className="btn_new" onClick={this.redirectfunc}>
              Submit
            </button>

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            {this.state.error.length > 0 &&
              <div className='alert alert-warning'>
                {this.state.error}
              </div>
            }
          </div>
        </ div>

        <div className="right_sec_frame">
        </ div>
        {/* {this.fileData()} */}
      </div>
    );
  }
}

export default UploadFile;
