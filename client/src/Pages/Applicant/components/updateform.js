import React from "react";
import { Grid, FormControl, Box, TextField } from "@mui/material";

function updateForm() {
  return (
    <Grid>
      <FormControl>
        <Grid item xs={12}>
          <Box m={1}>
            <TextField
              autoComplete="fname"
              name="applicantName"
              fullWidth
              id="applicantName"
              label="Full Name"
              // value={user.applicantName}
              // onChange={(e) =>
              //   setUser({ ...user, applicantName: e.target.value })
              // }
              autoFocus
            />
          </Box>
        </Grid>
        <Box m={1}>
          <TextField
            autoComplete="Username"
            name="username"
            required
            fullWidth
            id="username"
            label="Username"
            // value={user.username}
            // onChange={(e) =>
            //   setUser({ ...user, username: e.target.value })
            // }
            autoFocus
          />
        </Box>
        <Box m={1}>
          <TextField
            required
            fullWidth
            id="applicantEmail"
            label="Email Address"
            name="applicantEmail"
            autoComplete="applicantEmail"
            // value={user.username}
            // onChange={(e) =>
            //   setUser({ ...user, username: e.target.value })
            // }
            autoFocus
          />
        </Box>
      </FormControl>
    </Grid>
  );
}

export default updateForm;
