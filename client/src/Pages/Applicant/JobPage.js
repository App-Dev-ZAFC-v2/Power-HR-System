import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select'
import ResponsiveAppBar from '../../Components/Navbar';
import Navbar from 'react-bootstrap/Navbar';
import JobList from '../../Components/Jobs/JobList';
import JobView from '../../Components/Jobs/JobView';
import JobSearchBar from '../../Components/Jobs/SearchBar';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Pagination from 'react-bootstrap/Pagination';

import '../../styles/Job.css';

import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const options = [
    { value: '0', label: 'All' },
    { value: '1', label: 'Not Specified' },
    { value: '2', label: 'Accounting/Finance' },
    { value: '3', label: 'Admin/HR' },
    { value: '4', label: 'Sales/Marketing' },
    { value: '5', label: 'Arts/Media/Communications' },
    { value: '6', label: 'Services' },
    { value: '7', label: 'Education/Training' },
    { value: '8', label: 'Education' },
    { value: '9', label: 'Tech Support/IT' },
    { value: '10', label: 'Software Development' },
    { value: '11', label: 'Engineering' },
    { value: '12', label: 'Healthcare' },
    { value: '13', label: 'Manufacturing' },
    { value: '14', label: 'Legal' },
    { value: '15', label: 'Science' },
    { value: '16', label: 'Other' }
  ]

function JobPage(){

    // get user id from local storage
    // const token = localStorage.getItem('authToken');
    const detailId = JSON.parse(atob(localStorage.getItem('authToken').split('.')[1])).detailId;

    const [jobs, setJobs] = useState([]);
    const [job, setJob] = useState({});
    const [appliedJob, setAppliedJob] = useState([]);
    const [loading, setLoading] = useState(true);
    const [close, setClose] = useState(true);
    const [pagination, setPagination] = useState({
        active: 1,
        items: [],
        maxPage: 1,
        count: 0,
        start: 1,
        end: 1
    });
    // const [active, setActive] = useState(1);
    // const [max, setMax] = useState(1);
    const [active, setActive] = useState(1);
    const [pageNumbers, setPageNumbers] = useState([]);

    const [searchValue, setSearchValue] = useState('');
    const [specializations, setSpecializations] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);


    const handleSearch = (e) => {
        e.preventDefault();
        console.log(searchValue);
        if(selectedOption !== null){
        const newSpec = selectedOption.map((option) => {
            return option.value;
        }).join(',');
        setSpecializations(newSpec);
        }

        window.location.href = selectedOption !== null ? 
        `/applicant/jobs?search=${searchValue}&specializations=${specializations}` : 
        `/applicant/jobs?search=${searchValue}`;
    }

    useEffect(() => {
        handlePageClick(active);
        // get the applied jobs
        axios.get(`http://localhost:5000/applications/appliedby/${detailId}`)
            .then(res => {
                setAppliedJob(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            }
        );
    }, []);

    const handlePageClick = (e) => {
        setActive(e);
        // get url params
        const urlParams = new URLSearchParams(window.location.search);
        console.log(urlParams);
        const search = urlParams.get('search') || '';
        const spec = urlParams.get('specializations') || '';
        console.log(spec);
        // set the search value
        setSearchValue(search);
        // set the specializations value
        setSpecializations(specializations);
        console.log(`http://localhost:5000/jobs?page=${e}&search=${search}&specializations=${spec}`);
        axios.get(`http://localhost:5000/jobs?page=${e}&search=${search}&specializations=${spec}`)
            .then(res => {
                setJobs(res.data.results);
                setPagination({
                    maxPage: res.data.maxPage,
                    count: res.data.count,
                    start: res.data.start,
                    end: res.data.end
                });
                setLoading(false);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleCardClick = (e) => {
        //get the job object from the jobs array
        setClose(false);
        setJob(jobs.find(job => job._id === e));
    }

    let items = [];
    for (let number = 1; number <= pagination?.maxPage; number++) {
    items.push(
        <Pagination.Item onClick={()=>handlePageClick(number)} key={number} active={number === active}>
        {number}
        </Pagination.Item>,
    );
    }

    const handleApply = (e) => {
        
        console.log(job?._id);
        console.log("apply");
        axios.post(`http://localhost:5000/applications/${detailId}/apply/${job?._id}`)
            .then(res => { 
                console.log(res.data);
                setAppliedJob([...appliedJob, job?._id]);
            })
            .catch(err => { 
                console.log(err);
            }
        );
    }

    // a function that compares job id with applied job id
    const isApplied = (id) => {
        return appliedJob.includes(id);
    }


    return (
        <>
        <ResponsiveAppBar/>
        <Navbar bg="light" expand="lg">
        <Container fluid>
        <Navbar.Brand >Search</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex w-100" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              name="search"
              placeholder="Job title, Description, or Keywords"
              className="me-2 w-100"
              aria-label="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <Select
                // defaultValue={[options[0]].value}
                // defaultInputValue={options[0].value}
                placeholder="Select a Category"
                isMulti
                name="specializations"
                options={options}
                className="basic-multi-select w-100"
                classNamePrefix="select"
                isSearchable={true}
                value={selectedOption}
                onChange={setSelectedOption}
            />
            <Button type="submit" variant="success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        <Container >
            <Row>
                <Col xs={6} md={4} className="list-container">
                {pagination.start} - {pagination.end} of {pagination.count} jobs
                {jobs.map(job => (
                <Card tag="a" onClick={()=>handleCardClick(job._id)} key={job?._id} style={{ width: '18rem', cursor: "pointer" }}>
                    <Card.Body className='p-0'>
                        <Card.Title className='m-2'>{job?.name}</Card.Title>
                        <Card.Subtitle className="m-2 text-muted">{job?.location}</Card.Subtitle>
                        <Card.Text className='m-2'>
                            {job?.salary?.min} - {job?.salary?.max}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">{job?.dateEnd}</Card.Footer>
                </Card>
                ))}
                <div>
                    <Pagination>{items}</Pagination>
                    <br />
                </div>
                </Col>
                <Col xs={12} md={8} className="overflow-scroll">
                    {close ? 
                    <>
                    <h3>We have {pagination.count} jobs for you</h3>
                    <p>Select a job to view details</p>
                    </>
                    :
                    <>
                    <Row>
                        {
                            isApplied(job?._id) ?
                            <Button variant="success" disabled>Applied</Button>
                            :
                            <Button onClick={()=>handleApply()}>Apply Now</Button>
                        }
                        <Button onClick={()=>setClose(true)} variant="danger">Close</Button>
                    </Row>
                    <JobView job={job}/>
                    </>
                    }
                    </Col>
            </Row>
        </Container>
        </>
    );
}

export default JobPage;