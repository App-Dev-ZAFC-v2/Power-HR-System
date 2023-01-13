import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import axios from 'axios';
import { Form, Container, Row, Col, CloseButton, ListGroup } from 'react-bootstrap';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Box, Button, Divider, IconButton, List, ListItem, ListItemText } from '@mui/material';


function AddJob(props){
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

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [validated, setValidated] = useState(false);
    const [success, setSuccess] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const addScope = () => {
        setScopeList([...scopeList, scope]);
        setJob({...job, scope: [...scopeList, scope]});
        setScope("");
    }

    const removeScope = (index) => {
        const newScopeList = [...scopeList];
        newScopeList.splice(index, 1);
        setScopeList(newScopeList);
    }

    const addRequirements = () => {
        setRequirementsList([...requirementsList, requirements]);
        setJob({...job, requirements: [...requirementsList, requirements]});
        setRequirements("");
    }

    const removeRequirements = (index) => {
        const newRequirementsList = [...requirementsList];
        newRequirementsList.splice(index, 1);
        setRequirementsList(newRequirementsList);
    }

    const handleChange = (e) => {
        setJob({
            ...job,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/jobs/view/${props.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
        .then(res => {
            setJob(res.data);
            setScopeList(res.data.scope);
            setRequirementsList(res.data.requirements);
            // setLevelList(res.data?.level);
            // setSpecializationsList(res.data?.specializations);
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err);
            setIsError(true);
        })
    }, [props])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:5000/jobs/${props.id}`, job)
            .then(res => {
                window.location = "/admin/manage-job";
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleDelete = (index, type) => {
        if(type === "scope"){
            setScopeList(scopeList.filter((_, i) => i !== index));
            setJob({...job, scope: scopeList.filter((_, i) => i !== index)});
        }else if(type === "requirements"){
            setRequirementsList(requirementsList.filter((_, i) => i !== index));
            setJob({...job, requirements: requirementsList.filter((_, i) => i !== index)});
        }
    }

    function generate(element, type) {
        return element.map((value, index) => (
                <><Divider /><ListItem
                secondaryAction={<IconButton edge="end" aria-label="delete" onClick={() => handleDelete(index, type)} >
                    <RemoveCircleIcon />
                </IconButton>}
            >
                <ListItemText primary={value} />
            </ListItem><Divider /></>
            )
        );
    }


    return (
        <>
        <Container>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Job Name</Form.Label>
                    <Form.Control 
                    required
                    type="text" 
                    placeholder="Enter job name" 
                    name="name" 
                    value={job?.name} 
                    onChange={handleChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Job Description</Form.Label>
                    <Form.Control 
                    as="textarea" 
                    rows={3} 
                    name="description" 
                    value={job?.description}
                    onChange={handleChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Job Scope:</Form.Label>
                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                        <Form.Control type="text" placeholder="Enter job scope" name="scope" value={scope} onChange={(e) => setScope(e.target.value)}/>
                        <Button sx={{ml: "12px"}} variant="contained" color="primary" onClick={addScope}>Add</Button>
                    </Box>
                    
                    <List dense>
                        {generate(scopeList, "scope")}
                    </List>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Job Requirements:</Form.Label>
                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                        <Form.Control type="text" placeholder="Enter job requirements" name="requirements" value={requirements} onChange={(e) => setRequirements(e.target.value)}/>
                        <Button sx={{ml: "12px"}} variant="contained" color="primary" onClick={addRequirements}>Add</Button>
                    </Box>
                    <List dense>
                        {generate(requirementsList, "requirements")}
                    </List>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Job Level</Form.Label>
                    <Form.Control 
                    as="select" 
                    name="level" 
                    value={job?.level}
                    onChange={handleChange}>
                        {levelList.map((level, index) => (
                            <option key={index}>{level}</option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Job Salary</Form.Label>
                    <Row>
                        <Col>
                            <Form.Control 
                            type="number" 
                            placeholder="Min" 
                            name="min" 
                            value={job?.salary?.min}
                            onChange={(e) => setJob({...job, salary: {...job.salary, min: e.target.value}})}/>
                        </Col>
                        <Col>
                            <Form.Control 
                            type="number" 
                            placeholder="Max" 
                            name="max" 
                            value={job?.salary?.max}
                            onChange={(e) => setJob({...job, salary: {...job.salary, max: e.target.value}})}/>
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Job Location</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter job location" 
                    name="location" 
                    value={job?.location}
                    onChange={handleChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Job Specializations</Form.Label>
                    <Form.Control 
                    as="select" 
                    name="specializations"
                    value={job?.specializations} 
                    onChange={handleChange}>
                        {specializationsList.map((specializations, index) => (
                            <option key={index}>{specializations}</option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Job Quota</Form.Label>
                    <Form.Control 
                    type="number" 
                    placeholder="Enter job quota" 
                    name="quota" 
                    value={job?.quota}
                    onChange={handleChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Job Date Start</Form.Label>
                    <Form.Control 
                    type="date" 
                    // onFocus={(e) => e.target.type = "date"}
                    // onBlur={(e) => e.target.type = "text"}
                    name="dateStart" 
                    value={new Date(job?.dateStart).toISOString().slice(0, 10)}
                    onChange={handleChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Job Date End</Form.Label>
                    <Form.Control 
                    type="date" 
                    // onFocus={(e) => e.target.type = "date"}
                    // onBlur={(e) => e.target.type = "text"}
                    name="dateEnd"
                    placeholder={<Moment format="DD/MM/YYYY">{job?.dateEnd}</Moment> }
                    value={new Date(job?.dateEnd).toISOString().slice(0, 10)}
                    onChange={handleChange}/>
                </Form.Group>

                <Box sx={{display: 'flex', justifyContent: "center", mt: "12px"}}>
                    <Button sx={{pl: "64px", pr: "64px"}} variant="contained" color="success" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Box>
            </Form>
        </Container>
        </>
    );
}

export default AddJob;