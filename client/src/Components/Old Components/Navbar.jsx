import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, Link, Badge, Paper, Divider } from "@mui/material";
import Logo from "../../Assets/Logo.png";
import { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { getApplicantByID } from "../../Redux/slices/applicant";
import { getAdminByID, updateAdmin, updateCurrentAdmin } from "../../Redux/slices/admin";
import { getEmployeeByID } from "../../Redux/slices/employee";
import NotificationsIcon from '@mui/icons-material/Notifications';

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorElNotif, setAnchorElNotif] = useState(null);
    const [name, setName] = useState("");
    const [message, setMessage] = useState([]);
    const [check, setCheck] = useState(false);
    const userArr = ["applicant", "admin", "employee", "executive"];
    const [link, setLink] = useState("");

    const token = localStorage.getItem("authToken");
    const userType = JSON.parse(atob(token.split(".")[1])).userType;
    const detailId = JSON.parse(atob(token.split(".")[1])).detailId;

    const getDashboard = () => {
      return `/${userArr[userType]}/dashboard`;
    };

     //TODO: Add more links
    const getPages = () => {
      switch (userType) {
        case 0: //Applicant
          return [
            { link: "/", name: "STATUS" }
          ];
        case 1: //Admin
          return [
            { link: "/manage-forms", name: "MANAGE FORMS" }
          ];
        case 2: //Employee
          return [{ link: "/", name: "FEEDBACK" }];
        case 3: //Executive
          return [
            { link: "/", name: "ANALYZE" },
            { link: "/", name: "FEEDBACK REVIEW" },
          ];
        default:
          return [];
      }
    };

    const dispatch = useDispatch();

    const employee = useSelector((state) => state.employees.employee);
    const applicant = useSelector((state) => state.applicants.applicant);
    const admin = useSelector((state) => state.admins.currentAdmin);
    const allAdmins = useSelector((state) => state.admins.admin);
    const rloading = useSelector((state) => state.admins.loading);

    useEffect(() => {
      if (userType === 0) {
        dispatch(getApplicantByID(detailId));
      }
      else if (userType === 1) {
        dispatch(getAdminByID(detailId));
      }
      else {
        dispatch(getEmployeeByID(detailId));
      }
    }, [detailId]);

    useEffect(() => {
      if (userType === 0) {
        if(applicant.length > 1) {
          var temp = applicant.filter((item) => item._id === detailId);
          setName(temp[0]?.name);
        }
        else {
          setName(applicant?.name);
        }
      }
      else if (userType === 1) {
        setName(admin?.name);
      }
      else {
        if (employee.length > 1) {
          var temp = employee.filter((item) => item._id === detailId);
          setName(temp[0]?.name);
        }
        else {
          setName(employee?.name);
        }
      }
    }, [applicant, admin, employee]);

    //sort notification by date and show only unread notifications
    useEffect(() => {
      if(admin === null) return;
      if(check) return;

      var temp = JSON.parse(JSON.stringify(admin.notification));


      temp.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      temp = temp.filter((item) => item.read === false);

      setMessage(temp);
      setCheck(true);
      
    }, [admin]);

  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const handleOpenNotifMenu = (event) => {
      setAnchorElNotif(event.currentTarget);
    };

    const handleCloseNotifMenu = () => {
      setAnchorElNotif(null);
    };

    const handleMessage = (id) => {
      var tempAdmin = JSON.parse(JSON.stringify(admin));

      tempAdmin.notification.forEach((item) => {
        if(item._id === id){
          item.read = true;
        }
      });
      setMessage(tempAdmin.notification.filter((item) => item.read === false));
      dispatch(updateCurrentAdmin(tempAdmin));
      setLink(tempAdmin.notification.filter((item) => item._id === id)[0].link);
    };

    useEffect(() => {
      if(link !== "") {
        window.location.href = link;
      }
    }, [link]);





    const handleLogout = () => {
      localStorage.removeItem("authToken");
      window.location.href = "/";
    };
  
    return (
      <AppBar position="static" sx={{ backgroundColor: "#121212" }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box
              component="img"
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                height: 32,
              }}
              alt="Your logo."
              src={Logo}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href={getDashboard()}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              PowerHR
            </Typography>
  
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {getPages().map((page) => (
                  <Link key={page.name} href={"/" + userArr[userType] + page.link} underline="none">
                    <MenuItem key={page.name}>
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
            <Box
              component="img"
              sx={{
                display: { xs: "flex", md: "none" },
                mr: 1,
                height: 32,
              }}
              alt="Your logo."
              src={Logo}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href={getDashboard()}
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              PowerHR
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {getPages().map((page) => (
                <Link key={page.name} href={"/" + userArr[userType] + page.link} underline="none">
                  <Button
                    key={page.name}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      background: "#121212",
                      "&:hover": { background: "#f00" },
                    }}
                  >
                    {page.name}
                  </Button>
                </Link>
              ))}
            </Box>
            
            <Box sx={{ mr: "24px"}}>
              <IconButton
                size="large"
                aria-label="notifications"
                color="inherit"
                onClick={handleOpenNotifMenu}
              >
                <Badge badgeContent={message.length} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Menu
                sx={{ mt: "45px"}}
                style={{}}
                id="menu-appbar"
                anchorEl={anchorElNotif}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElNotif)}
                MenuListProps={{ disablePadding: true }}
                onClose={handleCloseNotifMenu}
              >
                {/* <MenuItem sx={{width: "500px"}} disabled>
                  <Typography textAlign="center">No new notifications</Typography>
                </MenuItem> */}
                <Box sx={{width: "500px", pt: 0}}>
                  <Paper sx={{pt: "20px", pb: "20px"}}>
                    <Typography variant="h4" textAlign="center">Notifications</Typography>
                  </Paper>
                </Box>

                {message.length === 0 ? (
                  <MenuItem sx={{width: "500px", p:0}} disabled>
                    <Paper sx={{pt: "30px", pb: "30px", width: 1}}>
                      <Typography sx={{pl: "24px"}}>No new notifications</Typography>
                    </Paper>
                  </MenuItem>
                ) : (
                  message.map((msg, index) => (
                    <div><MenuItem sx={{ width: "500px" }} key={index} onClick={() => (handleMessage(msg._id))}>
                      <Box sx={{ flexDirection: 'column' }}>
                        <Box sx={{ width: '100%', maxWidth: 500, m: 0 }}>
                          <Typography sx={{ m: 0, whiteSpace: "normal" }} variant="h6">{msg.subject}</Typography>
                        </Box>
                        <Box sx={{ width: '100%', maxWidth: 500, m: 0 }}>
                          <Typography sx={{ m: 0, whiteSpace: "normal" }} variant="body1">{msg.message}</Typography>
                        </Box>
                        {/* <Typography variant="subtitle2">{new Date(msg.date)}</Typography> */}
                      </Box>
                    </MenuItem><Divider /></div>
                  ))
                )}

              </Menu>
            </Box>
  
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Profile">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={name} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {userType !== 1? (
                <MenuItem onClick={() => (window.location.href = "/profile")}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                ) : ""}
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
  export default ResponsiveAppBar;