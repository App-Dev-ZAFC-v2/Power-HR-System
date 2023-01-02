import React from "react";
import { Card, Grid, Typography, CardActionArea } from "@mui/material";

export default function ViewForm(props) {
  const form = props.dataform;

  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <Card
          sx={{
            boxShadow: 10,
          }}
        >
          <CardActionArea
            onClick={() => (window.location = "/form/" + form._id)}
          >
            <Typography
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
              }}
              gutterBottom
              variant="h4"
              component="div"
              ml={2}
              mt={2}
            >
              {form.name}
            </Typography>
            <Typography
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
              }}
              variant="body2"
              color="text.secondary"
              height={60}
              ml={3}
            >
              {form.description}
            </Typography>
          </CardActionArea>
        </Card>
      </Grid>
    </>
  );
}
