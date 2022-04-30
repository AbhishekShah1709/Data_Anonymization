import axios from 'axios';
import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';
import '../css/policy.css'

class Table extends React.Component {

    constructor(props){
        super(props);
        this.getHeader = this.getHeader.bind(this);
        this.getRowsData = this.getRowsData.bind(this);
        this.getKeys = this.getKeys.bind(this);
    }

    getKeys = function(){
        return Object.keys(this.props.data[0]);
    }

    getHeader = function(){
        var keys = this.getKeys();
        return keys.map((key, index)=>{
            return <th key={key} scope="row">{key.toUpperCase()}</th>
        }) 
    }

    getRowsData = function(){
        var items = this.props.data;
        var keys = this.getKeys();
        return items.map((row, index)=>{
            return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
        }) 
    }

    render() {

        const thead_style = {color: "green"};
        const tbody_style = {color: "blue"};
        const table_style = {border: "1px solid black"}
        const td_th_style = {padding: "5px"}

        return (
                <div>
                <table  className="table table-striped table-dark table-bordered">
                {/* style={thead_style} */}
                <thead >
                <tr>{this.getHeader()}</tr>
                </thead>
                {/* style={tbody_style} */}
                <tbody >
                {this.getRowsData()}
                </tbody>
                </table>
                </div>

               );

    }
}

const RenderRow = (props) =>{
    return props.keys.map((key, index)=>{
        return <td key={props.data[key]}>{props.data[key]}</td>
    })
}

export default Table
