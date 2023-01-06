import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, Link } from "@mui/material";
import Logo from "../Assets/Logo.png";
import { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { getApplicantByID } from "../Redux/slices/applicant";
import { getAdminByID } from "../Redux/slices/admin";
import { getEmployeeByID } from "../Redux/slices/employee";

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [name, setName] = useState("");
    const userArr = ["applicant", "admin", "employee", "executive"];

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
    const admin = useSelector((state) => state.admins.admin);

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
    }, []);

    useEffect(() => {
      if (userType === 0) {
        setName(applicant?.name);
      }
      else if (userType === 1) {
        setName(admin?.name);
      }
      else {
        setName(employee?.name);
      }
    }, [applicant, admin, employee]);


  
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