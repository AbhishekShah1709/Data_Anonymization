import '../css/policy.css'

import axios from 'axios';
import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import { Link } from "react-router-dom";
// import 'react-dropdown/style.css';


// const Policy = () =>{
class Policy extends Component {
  dataTypes = ['Int', 'Float', 'Bool', 'String']
  dataMap = {
    'Numeric': ['Data perturbation', 'Generalization', 'Data swapping', 'Drop', 'None'],
    'Bool': ['Data swapping', 'Drop', 'None'],
    'String': ['Data Masking', 'Data Pseudonymization', 'Generalization', 'Data swapping', 'Drop', 'None'],
  }
  selectedPolicyMap = {}

  state = {
    isPolicyUpload: true,
    selectedFile: null,
    error_: "",
    colNames: [],
  };

  onSelect(colName, event) {
    this.selectedPolicyMap[colName] = event.value
    console.log(this.selectedPolicyMap)
  };

  submitFunc = () => {
    var temp=this
    console.log(this.selectedPolicyMap)
    const headers = {
      'Content-Type': 'text/plain'
    };
    axios.post('http://localhost:5000/uploadPolicy', { selectedPolicy: this.selectedPolicyMap }, { headers })
      .then(response => {
        console.log(response)
        window.open('/preview',"_self");
      })
      .catch(function (error) {
        temp.setState({ error_: "Please Upload a Dataset"})
        console.log(error);
      })
  }

  goback = () => {
    window.open('/selectpolicy',"_self")
  }
  
  componentDidMount() {
    // return;
    var temp=this
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
        // console.log(this)
        temp.setState({error_:error1})
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
              Select the policy for each Column
            </h1>
            <br>
            </br>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Column Name</th>
                  <th>Data Type</th>
                  <th> Select Policy</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.colNames.map((colName, i) => {
                    return (
                      <tr key={colName.Name}>
                        <td>{colName.Name}</td>
                        <td>{colName.type}</td>
                        <td><Dropdown options={this.dataMap[colName.type]} onChange={(e) => this.onSelect(colName.Name, e)} value={'None'} /> </td>

                      </tr>
                    )
                  })
                }
              </tbody>
            </table>

            <button onClick={this.submitFunc} className='btn_new'>
              Submit Policy
            </button>
            <br></br>
            <br></br>
            {this.state.error_.length > 0 &&
                <div className='alert alert-warning'>
                {this.state.error_}
                </div>
            }
          </div>

        </div>
        <div className="right_sec_frame">
        </ div>
      </div>

      // }
    );
  }
}

export default Policy;
