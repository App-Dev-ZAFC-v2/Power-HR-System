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
  const [isSuccess, setIsSuccess] = useState(false);

  const [job, setJob] = useState({
    jobName: "",
    jobDescription: "",
    qualification: "",
    cgpa: 0.0,
  });

  // //VALIDATION (NOT IMPLEMENT YET)
  // const [error, setError] = useState("");

  // const validate = () => {
  //   let temp = {};
  //   temp.jobTitle = job.jobTitle ? "" : "This field is required.";
  //   temp.jobDescription = job.jobDescription ? "" : "This field is required.";
  //   temp.qualification = job.qualification ? "" : "This field is required.";
  //   temp.cgpa = job.cgpa ? 0.0 : "This field is required.";

  //   setError({
  //     ...temp,
  //   });

  //   return Object.values(temp).every((x) => x === "");
  // };

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

  const handleAdd = async (e) => {
    try {
      console.log(job);
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
        });
    } catch (error) {
      console.log(error);
      // validate();
    }
  };

  const handleUpdate = async (e) => {
    try {
      console.log(job);
      axios
        .put(`http://localhost:5000/jobs/${id}`, job, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        .then((res) => {
          console.log(job);
          window.alert("Job updated successfully!");
          setIsSuccess(true);
          window.location.href = "/admin/manage-job";
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
      // validate();
    }
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
              <Form>
                <Form.Group controlId="formBasicJobTitle">
                  <Form.Label>Job Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter job name"
                    name="jobName"
                    value={job?.jobName}
                    onChange={onChangeInput}
                    // {...(error.jobTitle && {
                    //   error: true,
                    //   helperText: error.jobName,
                    // })}
                  />
                </Form.Group>
                <br></br>
                <Form.Group controlId="formBasicJobDescription">
                  <Form.Label>Job Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter job description"
                    name="jobDescription"
                    value={job?.jobDescription}
                    onChange={onChangeInput}
                    // {...(error.jobDescription && {
                    //   error: true,
                    //   helperText: error.jobDescription,
                    // })}
                  />
                </Form.Group>
                <br></br>
                <Form.Group controlId="formBasicQualification">
                  <Form.Label>Qualification</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter qualification"
                    name="qualification"
                    value={job?.criteria?.qualification}
                    onChange={onChangeInput}
                    // {...(error.qualification && {
                    //   error: true,
                    //   helperText: error.qualification,
                    // })}
                  />
                </Form.Group>
                <br></br>
                <Form.Group controlId="formBasicCgpa">
                  <Form.Label>CGPA</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter CGPA"
                    name="cgpa"
                    value={job?.criteria?.cgpa}
                    onChange={onChangeInput}
                    // {...(error.cgpa && {
                    //   error: true,
                    //   helperText: error.cgpa,
                    // })}
                  />
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
