import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
// import { IMaskInput } from "react-imask";
// import NumberFormat from "react-number-format";
// import PropTypes from "prop-types";

//ONLY NUMBER IN CGPA
// const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
//   const { onChange, ...other } = props;
//   return (
//     <IMaskInput
//       {...other}
//       mask="(#00) 000-0000"
//       definitions={{
//         "#": /[1-9]/,
//       }}
//       inputRef={ref}
//       onAccept={(value) => onChange({ target: { name: props.name, value } })}
//       overwrite
//     />
//   );
// });

// TextMaskCustom.propTypes = {
//   name: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
// };

// const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
//   props,
//   ref
// ) {
//   const { onChange, ...other } = props;

//   return (
//     <NumberFormat
//       {...other}
//       getInputRef={ref}
//       onValueChange={(values) => {
//         onChange({
//           target: {
//             name: props.name,
//             value: values.value,
//           },
//         });
//       }}
//       thousandSeparator
//       isNumericString
//       prefix="$"
//     />
//   );
// });

// NumberFormatCustom.propTypes = {
//   name: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
// };

// export function FormattedInputs() {
//   const [values, setValues] = React.useState({
//     textmask: "(100) 000-0000",
//     numberformat: "1320",
//   });

//   const handleChange = (event) => {
//     setValues({
//       ...values,
//       [event.target.name]: event.target.value,
//     });
//   };
function UpdateJob() {
  const { id } = useParams();
  const [job, setJob] = useState({
    jobTitle: "",
    jobDescription: "",
    qualification: "",
    cgpa: "",
  });

  //VALIDATION
  const [error, setError] = useState("");

  const validate = () => {
    let temp = {};
    temp.jobTitle = job.jobTitle ? "" : "This field is required.";
    temp.jobDescription = job.jobDescription ? "" : "This field is required.";
    temp.qualification = job.qualification ? "" : "This field is required.";
    temp.cgpa = job.cgpa ? "" : "This field is required.";

    setError({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((res) => {
        console.log(res.data.jobObject);
        setJob(res.data.jobObject);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  return (
    <>
      <Navbar />
      <Container>
        <Row>
          <Col md={6}>
            <br></br>
            <Typography align="center">
              {id ? <h1>Update Job</h1> : <h1>Add Job</h1>}
            </Typography>
            <Form>
              <Form.Group controlId="formBasicJobTitle">
                <Form.Label>Job Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter job title"
                  name="jobTitle"
                  value={job.jobTitle}
                  onChange={onChangeInput}
                />
              </Form.Group>
              <Form.Group controlId="formBasicJobDescription">
                <Form.Label>Job Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter job description"
                  name="jobDescription"
                  value={job.jobDescription}
                  onChange={onChangeInput}
                />
              </Form.Group>
              <Form.Group controlId="formBasicQualification">
                <Form.Label>Qualification</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter qualification"
                  name="qualification"
                  value={job.qualification}
                  onChange={onChangeInput}
                />
              </Form.Group>
              <Form.Group controlId="formBasicCgpa">
                <Form.Label>CGPA</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter CGPA"
                  name="cgpa"
                  value={job.cgpa}
                  onChange={onChangeInput}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <Button variant="danger" href="/admin/manage-job">
                Cancel
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default UpdateJob;
