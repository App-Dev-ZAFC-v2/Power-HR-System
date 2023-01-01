import React, { useEffect, useState } from "react";
// import Box from '@mui/material/Box';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";

// const bull = (
//   <Box
//     component="span"
//     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//   >
//   </Box>
// );

export default function BasicCard() {
  // const [card, setCard] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/forms/")
      .then((res) => {
        console.log(res.data);
        // setRows(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Card sx={{ maxWidth: 275, border: 2, borderColor: 'black', backgroundColor: '#D3D3D3', color: 'black' }}>
      <CardContent>
        {/* {card.map((item) => (
          <> */}
            {/* <div key={item.id}>{item.name}</div> */}
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Hello
            </Typography>
            <Typography variant="h5" component="div">
              Form name
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          {/* </>
        ))} */}
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
