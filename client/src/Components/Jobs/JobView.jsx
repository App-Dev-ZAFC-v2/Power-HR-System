import React, { useState, useEffect } from 'react';
import axios from 'axios';

function JobView(props) {

    const [job, setJob] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [placeholder, setPlaceholder] = useState(false);

    // useEffect(() => {
    //     if(props.jobId){
    //     axios.get(`http://localhost:5000/jobs/view/${props.jobId}`)
    //         .then(res => {
    //             setJob(res.data);
    //             setLoading(false);
    //             console.log(res.data);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             setError(true);
    //         })
    //     } else {
    //         console.log("No job id");
    //     }
    // }, [props.jobId]);

    return (
        <>
            {
                !props.close ? (
            <>
            <h1>{props.job?.name}</h1>
            <p>{props.job?.description}</p>
            <p> Job Scope: </p>
            <ul>
                {props.job?.scope?.map((scope, index) => (
                    <li key={index}>{scope}</li>
                ))}
            </ul>
            <p> Job Requirements: </p>
            <ul>
                {props.job?.requirements?.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                ))}
            </ul>
            <p>{props.job?.level}</p>
            <p>{props.job?.salary?.min} - {props.job?.salary?.max}</p>
            <p>{props.job?.location}</p>
            <p>{props.job?.specializations}</p>
            <p>{props.job?.dateEnd}</p>
            </>
            ) : (
                <>
                <h3>We have {props.count} jobs for you</h3>
                <p>Select a job to view details</p>
                </>
            )
            }
        </>
        );
}

export default JobView;