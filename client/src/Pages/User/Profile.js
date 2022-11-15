import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import {
  Grid,
  Box,
  Typography,
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
} from "@mui/material";
import ProfileCard from "../../Components/ProfileCard";
import axios from "axios";

function Profile() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [user, setUser] = useState([]);
  const token = localStorage.getItem("authToken");
  const [isLoading, setIsLoading] = useState(true);
  const [isRead, setIsRead] = useState(true);

  // FIND BETTER WAY TO DO THIS
  const userType = JSON.parse(atob(token.split(".")[1])).userType;
  // const userId = JSON.parse(atob(token.split('.')[1])).UserId;
  const detailId = JSON.parse(atob(token.split(".")[1])).detailId;
  // eslint-disable-next-line react-hooks/rules-of-hooks

  useEffect(() => {
    (userType === 0
      ? axios.get(`http://localhost:5000/applicants/${detailId}/`)
      : axios.get(`http://localhost:5000/employees/${detailId}/`)
    )
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/applicants/${detailId}/`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then((res) => {
        console.log(res);
        setIsRead(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Navbar />
      </Grid>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <Grid item xs={12} md={12} mx={10}>
            <Box>
              <ProfileCard />
            </Box>
          </Grid>
          <Grid item xs={12} md={12} mx={10}>
            <Card sx={{ minWidth: 275 }} boxShadow={8}>
              <CardContent>
                <Typography variant="h5" component="div" mt={3}>
                  User Profile
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary" mt={5}>
                  <Box>
                    <TextField
                      id="outlined-read-only-input"
                      label="Name"
                      defaultValue={user?.name}
                      margin="normal"
                      InputProps={{
                        readOnly: isRead,
                      }}
                      onChange={(e) => {
                        setUser({ ...user, name: e.target.value });
                      }}
                    />
                  </Box>
                  <Box>
                    <TextField
                      id="outlined-flexible-read-only-input"
                      label="Email"
                      defaultValue={user?.email}
                      margin="normal"
                      InputProps={{
                        readOnly: isRead,
                      }}
                      onChange={(e) => {
                        setUser({ ...user, email: e.target.value });
                      }}
                    />
                  </Box>
                  <Box>
                    <TextField
                      id="outlined-read-only-input"
                      label="Contact Number"
                      defaultValue={user?.contact}
                      margin="normal"
                      InputProps={{
                        readOnly: isRead,
                      }}
                      onChange={(e) => {
                        setUser({ ...user, contact: e.target.value });
                      }}
                    />
                  </Box>
                  {
                    user.position &&
                  <Box>
                    <TextField
                      id="outlined-read-only-input"
                      label="Position"
                      defaultValue={user?.position}
                      margin="normal"
                      InputProps={{
                        readOnly: isRead,
                      }}
                    />
                  </Box>
                  }
                </Typography>
              </CardContent>
              <CardActions>
                {isRead ? 
                <Button size="small" onClick={()=>setIsRead(false)}>
                  Update Profile
                </Button>
                :
                <>
                <Button size="small" variant="danger" onClick={()=>setIsRead(true)}>
                  Cancel
                </Button>
                <Button size="small" variant="success" onClick={handleSubmit}>
                  Submit Update
                </Button>
                </>
                }
              </CardActions>
            </Card>
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default Profile;
