import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';


function JobList() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://powerhr-server.azurewebsites.net/jobs/title')
            .then(res => {
                setJobs(res.data);
                setLoading(false);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const handleClick = (e) => {
        console.log("clicked");
    }

    return (
        <>
        
            {jobs.map(job => (
                <Card tag="a" onClick={handleClick} key={job?._id} style={{ width: '18rem', cursor: "pointer" }}>
                    <Card.Body className='p-0'>
                        <Card.Title className='m-2'>{job?.name}</Card.Title>
                        <Card.Subtitle className="m-2 text-muted">{job?.location}</Card.Subtitle>
                        <Card.Text className='m-2'>
                            {job?.salary?.min} - {job?.salary?.max}
                        </Card.Text>
                        <Accordion flush>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Accordion Item #1</Accordion.Header>
                            <Accordion.Body>
                                Career Level: {job?.level}
                            </Accordion.Body>
                            <Accordion.Body>
                                Job Type: {job?.specializations}
                            </Accordion.Body>
                        </Accordion.Item>
                        </Accordion>
                    </Card.Body>
                    <Card.Footer className="text-muted">{job?.dateEnd}</Card.Footer>
                </Card>
            ))}

        </>
        );
}

export default JobList;