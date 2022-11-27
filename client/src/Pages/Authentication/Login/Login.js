import React from "react";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  // Alert,
  FormHelperText,
} from "@mui/material";
import { Face as Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import Logo from "../../../Assets/Logo.png";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const theme = createTheme();

function Login() {
  // const [username] = useState("");
  // const [password] = useState("");
  const [values, setValues] = useState({
    username: "",
    password: "",
    showPassword: false,
  });
  const [userArr] = useState(["applicant", "admin", "employee", "executive"]);
  // const [userTitle, setUserTitle] = useState([
  //   "Applicant",
  //   "Admin",
  //   "Employee",
  // ]);

  const [userTypeIndex] = useState(2);
  console.log(userTypeIndex);

  const [error, setError] = useState({
    email: false,
    password: false,
    fetchError: false,
    fetchErrorMsg: "",
  });

  const handleShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleChange = (fieldName) => (event) => {
    setValues({ ...values, [fieldName]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = {
      username: values.username,
      password: values.password,
    };
    axios
      .post(`http://localhost:5000/login`, loginData)
      .then((res) => {
        console.log(res);
        localStorage.setItem("authToken", res.data.token);
        // get the user type from the token
        const userType = res.data.token.split(".")[1];
        const decodedUserType = atob(userType);
        const detailID = JSON.parse(decodedUserType).detailId;
        const userTypeIndex = JSON.parse(decodedUserType).userType;
        window.location.href = `/${userArr[userTypeIndex]}/dashboard`;
      })
      .catch((err) => {
        // setError(err.response.data.message);
        return setError({
          ...error,
          fetchError: true,
          fetchErrorMsg: err.response.data.message,
        });
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 10,
            borderRadius: 3,
            padding: 4,
          }}
        >
          <Box
            component="img"
            sx={{
              display: { md: "flex", padding: 2 },
              height: "70px",
            }}
            alt="Your logo."
            src={Logo}
            bgcolor="grey.900"
            borderRadius="50%"
          />
          <Typography variant="body">Power HR System</Typography>
          <Typography variant="h6" mt={1}>
            Login
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={(e) => handleSubmit(e)}
          >
            <TextField
              margin="normal"
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              autoComplete="off"
              // value={username}
              // onChange={(e) => values.username(e.target.value)}
              value={values.username}
              onChange={handleChange("username")}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type={values.showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              value={values.password}
              onChange={handleChange("password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
          {error.fetchError && (
            // <Alert variant="filled" severity="error">
            //   {error.fetchErrorMsg}
            // </Alert>
            <FormHelperText error contained variant="filled">
              {error.fetchErrorMsg}
            </FormHelperText>
          )}
        </Box>
        {/* link to register if they dont have an account */}
        <Box sx={{ mt: 4 }}>
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
