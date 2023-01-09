import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import ResponsiveAppBar from "../../Components/Old Components/Navbar";
import Navbar from "react-bootstrap/Navbar";
// import JobList from '../../Components/Jobs/JobList';
import JobView from "../../Components/Jobs/JobView";
// import JobSearchBar from '../../Components/Jobs/SearchBar';
// import Card from "react-bootstrap/Card";
// import Accordion from 'react-bootstrap/Accordion';
// import Pagination from "react-bootstrap/Pagination";
import SearchIcon from "@mui/icons-material/Search";

import "../../styles/Job.css";

import { Form } from "react-bootstrap";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActionArea,
  Typography,
  Grid,
  Container,
  Pagination,
} from "@mui/material";
import Moment from "react-moment";
import { DashboardLayout } from "../../Components/Applicant/Dashboard/dashboard-layout";

const options = [
  { value: "0", label: "All" },
  { value: "1", label: "Not Specified" },
  { value: "2", label: "Accounting/Finance" },
  { value: "3", label: "Admin/HR" },
  { value: "4", label: "Sales/Marketing" },
  { value: "5", label: "Arts/Media/Communications" },
  { value: "6", label: "Services" },
  { value: "7", label: "Education/Training" },
  { value: "8", label: "Education" },
  { value: "9", label: "Tech Support/IT" },
  { value: "10", label: "Software Development" },
  { value: "11", label: "Engineering" },
  { value: "12", label: "Healthcare" },
  { value: "13", label: "Manufacturing" },
  { value: "14", label: "Legal" },
  { value: "15", label: "Science" },
  { value: "16", label: "Other" },
];

function JobPage() {
  // get user id from local storage
  // const token = localStorage.getItem('authToken');
  const detailId = JSON.parse(
    atob(localStorage.getItem("authToken").split(".")[1])
  ).detailId;

  const [jobs, setJobs] = useState([]);
  const [job, setJob] = useState({});
  const [appliedJob, setAppliedJob] = useState([]);
  //   const [loading, setLoading] = useState(true);
  const [close, setClose] = useState(true);
  const [pagination, setPagination] = useState({
    active: 1,
    items: [],
    maxPage: 1,
    count: 0,
    start: 1,
    end: 1,
  });
  const [page, setPage] = React.useState(1);
  // const [active, setActive] = useState(1);
  // const [max, setMax] = useState(1);
  const [active, setActive] = useState(1);
  //   const [pageNumbers, setPageNumbers] = useState([]);

  const [searchValue, setSearchValue] = useState("");
  const [specializations, setSpecializations] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchValue);
    if (selectedOption !== null) {
      const newSpec = selectedOption
        .map((option) => {
          return option.value;
        })
        .join(",");
      setSpecializations(newSpec);
    }

    window.location.href =
      selectedOption !== null
        ? `/applicant/jobs?search=${searchValue}&specializations=${specializations}`
        : `/applicant/jobs?search=${searchValue}`;
  };

  useEffect(() => {
    handlePageClick(active);
    // get the applied jobs
    axios
      .get(`http://localhost:5000/applications/appliedby/${detailId}`)
      .then((res) => {
        setAppliedJob(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
    handlePageClick(value);
  };

  const handlePageClick = (e) => {
    setActive(e);
    // get url params
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    const search = urlParams.get("search") || "";
    const spec = urlParams.get("specializations") || "";
    console.log(spec);
    // set the search value
    setSearchValue(search);
    // set the specializations value
    setSpecializations(specializations);
    console.log(
      `http://localhost:5000/jobs?page=${e}&search=${search}&specializations=${spec}`
    );
    axios
      .get(
        `http://localhost:5000/jobs?page=${e}&search=${search}&specializations=${spec}`
      )
      .then((res) => {
        setJobs(res.data.results);
        setPagination({
          maxPage: res.data.maxPage,
          count: res.data.count,
          start: res.data.start,
          end: res.data.end,
        });
        // setLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardClick = (e) => {
    //get the job object from the jobs array
    setClose(false);
    setJob(jobs.find((job) => job._id === e));
  };

  // let items = [];
  // for (let number = 1; number <= pagination?.maxPage; number++) {
  //   items.push(
  //     <Pagination.Item
  //       onClick={() => handlePageClick(number)}
  //       key={number}
  //       active={number === active}
  //     >
  //       {number}
  //     </Pagination.Item>
  //   );
  // }

  const handleApply = (e) => {
    console.log(job?._id);
    console.log("apply");
    axios
      .post(`http://localhost:5000/applications/${detailId}/apply/${job?._id}`)
      .then((res) => {
        console.log(res.data);
        setAppliedJob([...appliedJob, job?._id]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // a function that compares job id with applied job id
  const isApplied = (id) => {
    return appliedJob.includes(id);
  };

  return (
    <>
      <DashboardLayout tab="Search Jobs">
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand>Search</Navbar.Brand>
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="small"
              >
                <SearchIcon />
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container style={{marginTop: "12px"}}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" gutterBottom mt={3}>
              {pagination.start} - {pagination.end} of {pagination.count} jobs
            </Typography>
            {jobs.map((job) => (
              <Card
                onClick={() => handleCardClick(job._id)}
                key={job?._id}
                sx={{
                  maxWidth: 345,
                  boxShadow: 10,
                  borderRadius: 3,
                  padding: 1,
                  margin: 1,
                  width: "100%",
                }}
              >
                <CardActionArea>
                  <CardHeader title={job?.name} subheader={job?.location} />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Salary Range : RM{job?.salary?.min} - RM{job?.salary?.max}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Offer ends in{" "}
                      <Moment format="DD/MM/YYYY">{job?.dateEnd}</Moment>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
            <Pagination
              count={pagination?.maxPage}
              page={page}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            {close ? (
              <>
                <Typography variant="h5" component="div" mt={20} align="center">
                  We have {pagination.count} jobs for you
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  Select a job to view details
                </Typography>
              </>
            ) : (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    {isApplied(job?._id) ? (
                      <Button fullWidth disabled variant="contained">
                        Applied
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleApply()}
                        fullWidth
                      >
                        Apply Now
                      </Button>
                    )}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button
                      onClick={() => setClose(true)}
                      variant="contained"
                      color="error"
                      fullWidth
                    >
                      Close
                    </Button>
                  </Grid>
                </Grid>
                <Card
                  sx={{
                    maxWidth: 845,
                    boxShadow: 10,
                    borderRadius: 3,
                    padding: 1,
                    margin: 1,
                    width: "100%",
                  }}
                  overflow="auto"
                >
                  <CardActionArea>
                    <JobView job={job} />
                  </CardActionArea>
                </Card>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
      </DashboardLayout>
    </>
  );
}

export default JobPage;
