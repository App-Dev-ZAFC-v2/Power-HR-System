import Navbar from '../../Components/Navbar';

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
        <h1>Applicant Dashboard</h1>
        {/* <h2>Jobs</h2>
        {jobs.map((job) => (
            <div key={job._id}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p>{job.location}</p>
            <p>{job.salary}</p>
            </div>
        ))} */}
        </>
    );
    }

export default ApplicantDashboard;