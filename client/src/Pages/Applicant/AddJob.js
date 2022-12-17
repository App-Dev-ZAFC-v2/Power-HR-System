import React, { useState, useEffect } from 'react';

import axios from 'axios';

import Navbar from '../../Components/Navbar';


import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function AddJob(){
    const [job, setJob] = useState({
        name: "",
        description: "",
        scope: [],
        requirements: [],
        level: "",
        salary: {
            min: 0,
            max: 0
        },
        location: "",
        specializations: "",
        quota: 0,
        dateStart: new Date(),
        dateEnd: new Date()
    });

    const [scope, setScope] = useState("");
    const [requirements, setRequirements] = useState("");

    const [scopeList, setScopeList] = useState([]);
    const [requirementsList, setRequirementsList] = useState([]);

    const [levelList, setLevelList] = useState(["Internship","Entry", "Mid", "Senior"]);
    const [specializationsList, setSpecializationsList] = useState(["Not Specified","Accounting/Finance", "Admin/HR", "Sales/Marketing", "Arts/Media/Communications", "Services", "Education/Training", "Tech Support/IT", "Software Development", "Engineering", "Healthcare", "Legal", "Manufacturing", "Science", "Other"]);

    const addScope = () => {
        setScopeList([...scopeList, scope]);
        setJob({...job, scope: [...scopeList, scope]});
        setScope("");
    }

    const addRequirements = () => {
        setRequirementsList([...requirementsList, requirements]);
        setJob({...job, requirements: [...requirementsList, requirements]});
        setRequirements("");
    }

    const handleChange = (e) => {
        setJob({
            ...job,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // setJob({
        //     ...job,
        //     scope: scopeList,
        //     requirements: requirementsList
        // });
        console.log(job);
        console.log(scopeList);
        console.log(requirementsList);
        axios.post("http://localhost:5000/jobs", job)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }


    return (
        <>
        <Navbar/>
        <Container>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Job Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter job name" name="name" onChange={handleChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Job Description</Form.Label>
                    <Form.Control as="textarea" rows={3} name="description" onChange={handleChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Job Scope</Form.Label>
                    <Form.Control type="text" placeholder="Enter job scope" name="scope" value={scope} onChange={(e) => setScope(e.target.value)}/>
                    <Button variant="primary" onClick={addScope}>Add</Button>
                    <ul>
                        {scopeList.map((scope, index) => (
                            <li key={index}>{scope}</li>
                        ))}
                    </ul>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Job Requirements</Form.Label>
                    <Form.Control type="text" placeholder="Enter job requirements" name="requirements" value={requirements} onChange={(e) => setRequirements(e.target.value)}/>
                    <Button variant="primary" onClick={addRequirements}>Add</Button>
                    <ul>
                        {requirementsList.map((requirements, index) => (
                            <li key={index}>{requirements}</li>
                        ))}
                    </ul>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Job Level</Form.Label>
                    <Form.Control as="select" name="level" onChange={handleChange}>
                        {levelList.map((level, index) => (
                            <option key={index}>{level}</option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Job Salary</Form.Label>
                    <Row>
                        <Col>
                            <Form.Control type="number" placeholder="Min" name="min" onChange={(e) => setJob({...job, salary: {...job.salary, min: e.target.value}})}/>
                        </Col>
                        <Col>
                            <Form.Control type="number" placeholder="Max" name="max" onChange={(e) => setJob({...job, salary: {...job.salary, max: e.target.value}})}/>
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Job Location</Form.Label>
                    <Form.Control type="text" placeholder="Enter job location" name="location" onChange={handleChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Job Specializations</Form.Label>
                    <Form.Control as="select" name="specializations" onChange={handleChange}>
                        {specializationsList.map((specializations, index) => (
                            <option key={index}>{specializations}</option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Job Quota</Form.Label>
                    <Form.Control type="number" placeholder="Enter job quota" name="quota" onChange={handleChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Job Date Start</Form.Label>
                    <Form.Control type="date" name="dateStart" onChange={handleChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Job Date End</Form.Label>
                    <Form.Control type="date" name="dateEnd" onChange={handleChange}/>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
        </Container>
        </>
    );
}

export default AddJob;