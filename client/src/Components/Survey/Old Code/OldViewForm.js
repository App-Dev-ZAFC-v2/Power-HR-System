import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";

function FormCard(props) {
  const [form, setForm] = useState({});

  useEffect(() => {
    setForm(props.dataform);
  }, [props.dataform]);

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card
        sx={{
          boxShadow: 10,
        }}
      >
        <CardActionArea onClick={() => (window.location = "/form/" + form._id)}>
          <CardContent>
            <Typography
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
              }}
              gutterBottom
              variant="body1"
              component="div"
            >
              Survery Name : {form.name}
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
            >
              Description : {form.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default FormCard;
