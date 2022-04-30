import axios from 'axios';
import React, { Component } from 'react';

class Home extends Component {
    constructor(props) {
        super(props);
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
            axios.post("http://localhost:5000/uploader", formData);
            window.open('policy', "_self")
        }
        else {
            console.log("called2")
            this.setState({ error: "Please select a file before submitting" })
            console.log("called3")
            console.log()

        }
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
    anonymatronFunc = () =>{
        window.open("anonymatron","_self")
    }
    ourFunc = () =>{
        window.open("/","_self")
    }


    render() {

        return (
            <div className='container-fluid'>
                <div className='sidebar'>
                    <h1 className='heading1'>DATA</h1>
                    <h1 className='heading2'>ANONYMIZATION</h1>
                </div>
                <div className="sec_frame">
 
                </div>
                <div className='main'>

                    <div className='parent' style={{ display: this.state.isPolicyUpload ? 'block' : "none" }}>
                        <h1>
                            Choose the tool you want to use to anonymize your data
                        </h1>
                        <button className="btn_new" onClick={this.anonymatronFunc}>
                            Anonymatron
                        </button>
                        <button onClick={this.ourFunc} className='btn_new'>
                            Use Our model
                        </button>

                        {this.state.error.length > 0 &&
                            <div className='alert alert-warning'>
                                {this.state.error}
                            </div>
                        }
                    </div>
                </ div>

                <div className="right_sec_frame">
                </ div>
            </div>
        );
    }
}

export default Home;
