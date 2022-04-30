import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
export default function Administrator(props) {
    const data = [
        {
            'name': 'Naman\'s Database',
            'version': '1.1.4',
            'publisher': 'Arohi',
        },
        {
            'name': 'Naman\'s Database 2',
            'version': '1.2.1',
            'publisher': 'Sajal',
        }
    ]
    // const { email } = props.location;
    const [datasets, setDatasets] = useState(data);
    return (
        <div style={{
            backgroundImage: "linear-gradient(140deg, #EADEDB 0%, #BC70A4 50%, #BFD641 75%)",
            margin: 'auto',
            height: '100vh',
            justifyContent: 'center',
            placeContent: 'center'

        }} className="container-fluid text-center">
            <div >
                <h2 className="pt-5 pb-3">Approvals Pending</h2>
                <Table striped bordered hover responsive size="sm" className="text-center">
                    <thead>
                        <tr>
                            <th>Database Name</th>
                            <th>Version</th>
                            <th>Published By</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            datasets.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{item['name']}</td>
                                        <td>{item['version']}</td>
                                        <td>{item['publisher']}</td>
                                        <td><Button variant="success">Approve</Button></td>
                                        <td><Button variant="danger">Reject</Button></td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}