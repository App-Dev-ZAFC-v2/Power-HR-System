import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

function UpdateJob() {
  const { id } = useParams();
  const [job, setJob] = useState({
    jobTitle: "",
    jobDescription: "",
    qualification: "",
    cgpa: 0.00,
  });

  //VALIDATION (NOT IMPLEMENT YET)
  const [error, setError] = useState("");

  const validate = () => {
    let temp = {};
    temp.jobTitle = job.jobTitle ? "" : "This field is required.";
    temp.jobDescription = job.jobDescription ? "" : "This field is required.";
    temp.qualification = job.qualification ? "" : "This field is required.";
    temp.cgpa = job.cgpa ? 0.00 : "This field is required.";

    setError({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/job/update/${id}`, job)
      .then((res) => {
        console.log(res.data);
        alert("Job updated successfully!");
      })
      .catch((err) => {
        validate();
      });
  };

  // const onChangeInput = (e) => {
  //   const { name, value } = e.target;
  //   setJob({ ...job, [name]: value });
  // };

  return (
    <>
      <Navbar />
      <Container >
        <Row>
          <Col md={100}>
            <br></br>
            <Typography align="center">
              {id ? <h1>Update Job</h1> : <h1>Add Job</h1>}
            </Typography>
            <Form onSubmit={(e) => handleSubmit(e)}>
              <Form.Group controlId="formBasicJobTitle">
                <Form.Label>Job Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter job title"
                  name="jobTitle"
                  value={job.jobTitle}
                  onChange={(e) => setJob({ ...job, jobTitle: e.target.value })}
                  {...(error.jobTitle && {
                    error: true,
                    helperText: error.jobTitle,
                  })}
                />
              </Form.Group><br></br>
              <Form.Group controlId="formBasicJobDescription">
                <Form.Label>Job Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter job description"
                  name="jobDescription"
                  value={job.jobDescription}
                  onChange={(e) => setJob({ ...job, jobDescription: e.target.value })}
                  {...(error.jobDescription && {
                    error: true,
                    helperText: error.jobDescription,
                  })}
                />
              </Form.Group><br></br>
              <Form.Group controlId="formBasicQualification">
                <Form.Label>Qualification</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter qualification"
                  name="qualification"
                  value={job.qualification}
                  onChange={(e) => setJob({ ...job, qualification: e.target.value })}
                  {...(error.qualification && {
                    error: true,
                    helperText: error.qualification,
                  })}
                />
              </Form.Group><br></br>
              <Form.Group controlId="formBasicCgpa">
                <Form.Label>CGPA</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter CGPA"
                  name="cgpa"
                  value={job.cgpa}
                  onChange={(e) => setJob({ ...job, cgpa: e.target.value })}
                  {...(error.cgpa && {
                    error: true,
                    helperText: error.cgpa,
                  })}
                />
              </Form.Group>
              <br></br>
              <Box textAlign="center">
                <Button variant="primary" type="submit" onClick={(e) => handleSubmit(e)} align="center">
                Submit
              </Button>&nbsp;&nbsp;
              <Button variant="danger" href="/admin/manage-job" align="center">
                Cancel
              </Button>
              </Box>

              
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default UpdateJob;
