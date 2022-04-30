import '../css/policy.css'

import axios from 'axios';
import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import { Link } from "react-router-dom";

class Policy extends Component {
  dataTypes = ['Int', 'Float', 'Bool', 'String']
  dataMap = {
    'Numeric': ['Data perturbation', 'Synthetic data', 'Data Pseudonymization', 'Generalization', 'Data swapping', 'Drop', 'None'],
    'Bool': ['Data swapping', 'Drop', 'None'],
    'String': ['Data Masking', 'Data Pseudonymization', 'Generalization', 'Data swapping', 'Drop', 'None'],
  }
  selectedPolicyMap = {}

  state = {
    isPolicyUpload: true,
    selectedFile: null,
    error: "",
    colNames: [{ 'Name': '22343afdf2', 'type': "Numeric" }, { 'Name': 'Col2', 'type': "Bool" }],
  };

  onFileChange = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  onFileUpload = () => {

    const formData = new FormData();

    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    console.log(this.state.selectedFile);

    // Request made to the backend api
    // Send formData object
    axios.post('http://localhost:5000/uploadPolicy2', formData)
      .then(response => {
          if(response.data=="1"){
              this.setState({ error: "Either columns names are incorrect or inappropriate policy given for some data type"})
          }
          else{
              console.log(response);
              window.open('/preview',"_self");
          }
      })
      .catch(function (error) {
        console.log(error);
      })
  };

  goback = () => {
    window.open('/selectpolicy',"_self")
  }
  
  componentDidMount() {
    // return;
    const headers = {
      'Content-Type': 'text/plain'
    };
    axios.get('http://localhost:5000/dataType', { selectedPolicy: this.selectedPolicyMap }, { headers })
      .then(response => {
        console.log(response)
        console.log(response.data['data'])
        console.log(response.data['data'][0])
        console.log(response.data['data']['0'])

        this.setState({colNames:response.data['data']})
        // window.open('/preview');
      })
      .catch(function (error1) {
        this.setState({error:error1})
        console.log(error1);
      })
  }
  render() {

    return (
      <div className='container-fluid'>
        <div className='sidebar'>
          <h1 className='heading1'>DATA</h1>
          <h1 className='heading2'>ANONYMIZATION</h1>
        </div>
        <div className="sec_frame">
                <button className="back" onClick={this.goback}>
                  {"<<"}
                </button>
        </div>


        <div className='main'>
          <div className='parent'>
            <h1>
              Upload the policy file
            </h1>
            <br></br>
            <input className="inputfile" type="file" onChange={this.onFileChange} />
            <br/>
            <br/>

            <button onClick={this.onFileUpload} className="btn_new">
              Upload
            </button>

            <br/>
            <br/>
            <br/>
            <br/>
            {this.state.error.length > 0 &&
                <div className='alert alert-warning'>
                {this.state.error}
                </div>
            }
          </div>

        </div>
        <div className="right_sec_frame">
        </div>
      </div>

      // }
    );
  }
}

export default Policy;
