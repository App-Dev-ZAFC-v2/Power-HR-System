import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

function UpdateJob() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [validated, setValidated] = useState(false);
  const [, setIsSuccess] = useState(false);

  const [job, setJob] = useState({
    jobName: "",
    jobDescription: "",
    qualification: "",
    cgpa: 0.0,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setJob(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    const val = e.target.type === "number" ? parseFloat(value) : value;
    setJob({ ...job, [name]: value });
    setJob({ ...job, [name]: val });
  };

  const validate = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
  };

  const handleAdd = async (e) => {
    console.log(job);
    e.preventDefault();
    axios
      .post("http://localhost:5000/jobs/", job, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setIsSuccess(true);
        window.alert("Job added successfully!");
        window.location.href = "/admin/manage-job";
      })
      .catch((err) => {
        console.log(err);
        validate(e);
      });
  };

  const handleUpdate = async (e) => {
    console.log(job);
    e.preventDefault();
    axios
      .patch(`http://localhost:5000/jobs/${id}`, job, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((res) => {
        console.log(job);
        setIsSuccess(true);
        window.alert("Job updated successfully!");
        window.location.href = "/admin/manage-job";
      })
      .catch((err) => {
        console.log(err);
        validate(e);
      });
  };

  return (
    <>
      <Navbar />
      <Container>
        <Row>
          <Col md={100}>
            <br></br>
            <Typography align="center">
              {id ? <h1>Update Job</h1> : <h1>Add Job</h1>}
            </Typography>
            {isLoading && id ? (
              <Box sx={{ display: "flex" }}>
                <Typography>Loading...</Typography>
              </Box>
            ) : (
              <Form noValidate validated={validated}>
                <Form.Group controlId="formBasicJobTitle">
                  <Form.Label>Job Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter job name"
                    name="jobName"
                    value={job?.jobName}
                    onChange={onChangeInput}
                  />
                  <Form.Control.Feedback type="invalid">
                    This field is required{" "}
                  </Form.Control.Feedback>
                </Form.Group>
                <br></br>
                <Form.Group controlId="formBasicJobDescription">
                  <Form.Label>Job Description</Form.Label>
                  <Form.Control as = "textarea" rows = {6}
                    required
                    type="text"
                    placeholder="Enter job description"
                    name="jobDescription"
                    value={job?.jobDescription}
                    onChange={onChangeInput}
                  />
                  <Form.Control.Feedback type="invalid">
                    This field is required{" "}
                  </Form.Control.Feedback>
                </Form.Group>
                <br></br>
                <Form.Group controlId="formBasicQualification">
                  <Form.Label>Qualification</Form.Label>
                  <Form.Control as = "textarea" rows = {6}
                    required
                    type="text"
                    placeholder="Enter qualification"
                    name="qualification"
                    value={job?.qualification}
                    onChange={onChangeInput}
                  />
                  <Form.Control.Feedback type="invalid">
                    This field is required{" "}
                  </Form.Control.Feedback>
                </Form.Group>
                <br></br>
                <Form.Group controlId="formBasicCgpa">
                  <Form.Label>CGPA</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter CGPA"
                    name="cgpa"
                    value={job?.cgpa}
                    onChange={onChangeInput}
                    isInvalid={job?.cgpa <= 0 && job?.cgpa > 4}
                  />
                  <Form.Control.Feedback type="invalid">
                    CGPA must between 0 and 4.00{" "}
                  </Form.Control.Feedback>
                </Form.Group>
                <br></br>

                <Box textAlign="center">
                  {id ? (
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={handleUpdate}
                      align="center"
                    >
                      Update Job
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={handleAdd}
                      align="center"
                    >
                      Add Job
                    </Button>
                  )}
                  &nbsp;&nbsp;
                  <Button
                    variant="danger"
                    href="/admin/manage-job"
                    align="center"
                  >
                    Cancel
                  </Button>
                </Box>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default UpdateJob;
