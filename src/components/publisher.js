import React, { useState } from "react";
import { Button, FloatingLabel, Form, FormLabel, Table } from "react-bootstrap";

export default function Publisher(props) {
    const data = [
        {
            'name': 'Naman\'s Database',
            'version': '1.1.4',
            'requestor': 'Arohi',
        },
        {
            'name': 'Naman\'s Database 2',
            'version': '1.2.1',
            'requestor': 'Sajal',
        }
    ]
    // const { email } = props.location;
    //console.log(email);
    const [validated, setValidated] = useState(false);
    const [datasets, setDatasets] = useState(data);
    const [publishRequested, setPublish] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event);
        const form = event.currentTarget;
        console.log(form);
        if (form.checkValidity() === false) {
            event.stopPropogation();
        }
        setValidated(true);
    }

    const renderPublishForm = (
        <Form onSubmit={handleSubmit} validated={validated} className="d-flex flex-column justify-content-center text-center items-center">
            <FloatingLabel label="Database Name" controlId="formBasicText" className="mb-3">
                <Form.Control type="text" placeholder="Please Enter Database Name" />
            </FloatingLabel>
            <FloatingLabel label="Version" controlId="formBasicText" className="mb-3">
                <Form.Control type="text" placeholder="Please Enter Database Version" />
            </FloatingLabel>
            <FloatingLabel label="Database Zip File" controlId="formFile" className="mb-3">
                <Form.Control type="file" className="mt-2" accept=".zip" />
            </FloatingLabel>
            <Form.Group className="mb-3 d-flex flex-row align-center" controlId="formSwitch">
                <Form.Label>Requires Approval For Download</Form.Label>
                <Form.Check type="switch" className="px-5 mx-5" lable="Is Approval Required" />
            </Form.Group>
            <Button variant="primary" type="submit" className="">
                Publish
            </Button>
        </Form>
    )
    return (
        <div style={{
            backgroundImage: "linear-gradient(140deg, #EADEDB 0%, #BC70A4 50%, #BFD641 75%)",
            margin: 'auto',
            height: '100vh',
            justifyContent: 'center',
            placeContent: 'center'

        }} className="container-fluid text-center">
            {publishRequested === false ?
                (<div><div style={{
                    "height": '70vh'
                }}>
                    <h2 className="pt-5 pb-3">Download Requests</h2>
                    <Table striped bordered hover responsive size="sm" className="text-center">
                        <thead>
                            <tr>
                                <th>Database Name</th>
                                <th>Version</th>
                                <th>Requested By</th>
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
                                            <td>{item['requestor']}</td>
                                            <td><Button variant="success">Accept</Button></td>
                                            <td><Button variant="danger">Decline</Button></td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </Table>
                </div>
                    <div >
                        <Button variant="primary" onClick={() => {
                            setPublish(true);
                        }}>Publish a Dataset</Button>
                    </div>
                </div>) :
                (<div style={{
                    width: '50%',
                    justifyContent: 'center',
                    margin: 'auto',
                    padding: '4rem'
                }}>
                    <h2 className="pt-5 pb-3">Database To Publish</h2>
                    {renderPublishForm}
                </div>)
            }
        </div >
    )
}
