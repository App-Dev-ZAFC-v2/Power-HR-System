import React from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, Container } from "@mui/material";
import { useState } from "react";

//for tab

const theme = createTheme();

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [login, setLogin] = useState(false);
  const [userArr] = useState(["applicant", "admin", "employee", "executive"]);
  const [userTitle, setUserTitle] = useState(["Applicant", "Admin", "Employee"]);
  const [error, setError] = useState("");

  const [userTypeIndex, setUserTypeIndex] = useState(2);
  console.log(userTypeIndex);

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = {
      username,
      password,
    };
    axios
      .post(`http://localhost:5000/login`, loginData)
      .then((res) => {
        console.log(res);
        localStorage.setItem("authToken", res.data.token);
        // get the user type from the token
        const userType = res.data.token.split(".")[1];
        const decodedUserType = atob(userType);
        const userTypeIndex = JSON.parse(decodedUserType).userType;
        // go to the user's page
        window.location.href = `/${userArr[userTypeIndex]}/dashboard`;
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={(e) => handleSubmit(e)}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e) => handleSubmit(e)}
            >
              Sign In
            </Button>
          </Box>
{/*           
          <Button variant="contained" onClick={() => setUserTypeIndex(0)}>
            Applicant
          </Button>
          <Button variant="contained" onClick={() => setUserTypeIndex(1)}>
            Admin
          </Button>
          <Button variant="contained" onClick={() => setUserTypeIndex(2)}>
            Employee
          </Button> */}
        </Box>
        {/* link to register if they dont have an account */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Don't have an account? "}
            <a href="/register">Register</a>
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
