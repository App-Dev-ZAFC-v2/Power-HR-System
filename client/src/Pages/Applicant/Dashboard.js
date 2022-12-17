import React from "react";
import Navbar from "../../Components/Navbar";
import ProfileCard from "../../Components/ProfileCard";
import Welcome from "../../Components/Welcome";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import { Button } from "react-bootstrap";

function ApplicantDashboard() {
  // const [jobs, setJobs] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //     async function getJobs() {
  //     const res = await axios.get("/api/jobs");
  //     setJobs(res.data);
  //     setLoading(false);
  //     }
  //     getJobs();
  // }, []);

  // if (loading) {
  //     return <h1>Loading...</h1>;
  // }

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          mt={3}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <Grid item xs={4} sx={{ display: { xs: "none", md: "flex" } }}>
            <ProfileCard />
          </Grid>
          <Grid item xs>
            <Welcome />
          </Grid>
        </Grid>

        <Grid
          mt={3}
          container
          spacing={2}
          direction="column"
          alignItems="center"
          justify="center"
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          <Grid item sx={{ display: { xs: "flex", md: "none" } }}>
            <ProfileCard />
          </Grid>
        </Grid>
      </Container>
      {/* <h2>Jobs</h2>
        {jobs.map((job) => (
            <div key={job._id}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p>{job.location}</p>
            <p>{job.salary}</p>
            </div>
        ))} */}
      <Button variant="primary" href="/applicant/jobs">
        View Available Jobs
      </Button>
      <Button variant="primary" href="/applicant/view-application">
        View Application
      </Button>
    </>
  );
}

export default ApplicantDashboard;
