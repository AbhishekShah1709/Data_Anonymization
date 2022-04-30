import axios from 'axios';
import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Table from './table.js'
import '../css/policy.css'


class Preview extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            colNames: [{ 'Name': '22343afdf2', 'type': "Int" }, { 'Name': 'Col2', 'type': "Bool" }],
            error: "",
            anon: false,
            k_val:1,
            // data: [{ 'fruit': 'Apple', 'cost': 100 }, { 'fruit': 'Orange', 'cost': 50 }, { 'fruit': 'Orange', 'cost': 70 }]
            data:[{}]
        }
    }
    

  goback = () => {
      if(this.state.anon==true){
        window.open('/anonymatron',"_self")
      }
      else{
        window.open('/selectpolicy',"_self")
      }
  }

    componentDidMount() {
        // return;
        const headers = {
            'Content-Type': 'text/plain'
        };
        axios.get('http://localhost:5000/getPreview', { selectedPolicy: this.selectedPolicyMap }, { headers })
            .then(response => {

                if(response=="1"){
                    this.setState({ error: "Some bug!"})
                }
                console.log(response)
                if(response.data['anon']==true){
                    this.setState({ anon: true})
                }
                this.setState({k_val: response.data['kAnon']})

                // console.log(response.data['data']['data'])
            
                // console.log(response.data['data'][0])
                // console.log(response.data['data']['0'])

                this.setState({ data: response.data['data'] })
                // window.open('/preview');
            })
            .catch(function (error1) {
                this.setState({ error: error1 })
                console.log(error1);
            })
    }

    downloadFunc = () => {
        this.setState({ error: "" })

            axios.get("http://localhost:5000/download")
            .then(response => {
                console.log("response");
                console.log(response);
            })
        .catch(function(error1){
            this.setState({error:error1});
        });
        //      window.open('selectpolicy',"_self")

    }


    render() {
        // return (<Table data={this.state.data}/>)
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
                    <p className="para">
                            THIS DATA IS {this.state.k_val}-ANONYMIZED
                        </p>
                        <Table data={this.state.data} />
                        {this.state.error.length > 0 &&
                            <div className='alert alert-warning'>
                            {this.state.error}
                            </div>
                        }
                        {/* <button className="btn_new" onClick={this.downloadFunc}>
                        Download File
                        </button> */}

                        <a className="link" href="http://localhost:5000/download">Download</a>

                    </div>
 
                </div>
                <div className="right_sec_frame">
                </ div>
            </div>
        );
    }
}

export default Preview

