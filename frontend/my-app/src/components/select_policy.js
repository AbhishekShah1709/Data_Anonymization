import '../css/policy.css'

import axios from 'axios';
import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import { Link } from "react-router-dom";
// import 'react-dropdown/style.css';


// const Policy = () =>{
class SelectPolicy extends Component {
  selectedPolicyMap = {}

  state = {
    isPolicyUpload: true,
    selectedFile: null,
    colNames: [{ 'Name': '22343afdf2', 'type': "Numeric" }, { 'Name': 'Col2', 'type': "Bool" }],
    // options: ['one', 'two'],
  };

  uploadPolicyFunc = () => {
    window.open('/uploadpolicy',"_self")
  }
  
  selectPolicyFunc = () => {
    window.open('/manualpolicy',"_self")
  }

  goback = () => {
    window.open('/',"_self")
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
            {/* <nav className="navbar"> */}
                <button className="back" onClick={this.goback}>
                  {"<<"}
                </button>
            {/* </nav> */}
        </div>
        <div className='main'>
            <div className='parent'>
                <h1>
                  Choose a method to input policies
                </h1>
                <br />
                <br />
                <button className="btn_new" onClick={this.uploadPolicyFunc}>
                  Upload Policy File
                </button>
                <button className='btn_new' onClick={this.selectPolicyFunc}>
                 Give Policy Manually
                </button>
            </ div>
        </ div>
        <div className="right_sec_frame">
        </ div>
      </div>

      // }
    );
  }
}

export default SelectPolicy;
