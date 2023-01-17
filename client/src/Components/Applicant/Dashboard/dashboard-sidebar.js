import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Link,
  Typography,
  useMediaQuery,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Logo from "../../../Assets/Logo.png";
import { NavItem } from "./nav-item";
import { getApplicantByID } from "../../../Redux/slices/applicant";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageviewIcon from "@mui/icons-material/Pageview";
const items = [
  {
    href: "/applicant/dashboard",
    icon: <DashboardIcon fontSize="small" />,
    title: "Dashboard",
  },
  {
    href: "/applicant/jobs",
    icon: <PageviewIcon fontSize="small" />,
    title: "View Available Jobs",
  },
  {
    href: "/applicant/view-application",
    icon: <WorkIcon fontSize="small" />,
    title: "View Application",
  },
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");
  const [detailId, setDetailId] = useState();
  

  useEffect(() =>{
    if(token === null || token === undefined || token === ""){
      window.location.href = "/login";
      return;
    }
    setDetailId(JSON.parse(atob(token.split(".")[1])).detailId);
  },[])

  const dispatch = useDispatch();
  const applicant = useSelector((state) => state.applicants.applicant);

  useEffect(() => {
    dispatch(getApplicantByID(detailId));
  }, [detailId]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Link href="/applicant/dashboard" underline="none" color="inherit">
            <Box sx={{ p: 3, display: "flex", flexDirection: "row" }}>
              <Box
                component="img"
                sx={{
                  height: 42,
                  width: 42,
                }}
                alt="Your logo"
                src={Logo}
              />
              <Box>
                <Typography color="inherit" variant="h4">
                  Power HR
                </Typography>
              </Box>
            </Box>
          </Link>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                px: 3,
                py: "11px",
                borderRadius: 1,
              }}
            >
              <div>
                <Typography color="inherit" variant="subtitle1">
                  {applicant?.name}
                </Typography>
              </div>
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              to={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
        <Box
          sx={{
            px: 2,
            py: 3,
          }}
        >
          <Button
            color="error"
            component="a"
            endIcon={<LogoutIcon />}
            fullWidth
            sx={{ mt: 2 }}
            variant="contained"
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
