import React, { useState, useEffect } from 'react';
import axios from 'axios';

function JobView(props) {

    const [job, setJob] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [placeholder, setPlaceholder] = useState(false);
    // const [isClose, setIsClose] = useState(true);

   

    return (
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
           
        );
}

export default JobView;