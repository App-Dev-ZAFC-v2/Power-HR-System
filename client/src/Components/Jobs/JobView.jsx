import { Typography } from "@mui/material";
import React from "react";
import Moment from "react-moment";
//search icon mui

function JobView(props) {
  //   const [job, setJob] = useState({});
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(false);
  //   const [placeholder, setPlaceholder] = useState(false);
  // const [isClose, setIsClose] = useState(true);

  return (
    <>
      <Typography variant="h4">{props.job?.name}</Typography>
      <Typography variant="body2" color="text.secondary">
        Location : {props.job?.location}
      </Typography>
      <Typography variant="body2" mb={1}>
        {props.job?.description}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Job Details
      </Typography>
      <ul>
        {props.job?.scope?.map((scope, index) => (
          <li key={index}>
            <Typography variant="body2">{scope}</Typography>
          </li>
        ))}
      </ul>
      <Typography variant="h6" gutterBottom>
        {" "}
        Job Requirements:{" "}
      </Typography>
      <ul>
        {props.job?.requirements?.map((requirement, index) => (
          <li key={index}>
            {" "}
            <Typography variant="body2">{requirement}</Typography>
          </li>
        ))}
      </ul>
      <Typography variant="body2" gutterBottom>
        Level : {props.job?.level}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Salary Range : RM {props.job?.salary?.min} - RM{props.job?.salary?.max}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Specialization : {props.job?.specializations}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Offer ends in <Moment format="DD/MM/YYYY">{props.job?.dateEnd}</Moment>
      </Typography>
    </>
  );
}

export default JobView;
