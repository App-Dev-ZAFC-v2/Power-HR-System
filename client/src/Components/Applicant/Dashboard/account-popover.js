import { useContext } from "react";
// import Router from 'next/router';
import PropTypes from "prop-types";
import { Box, MenuItem, MenuList, Popover, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const navigate = useNavigate();
  const applicant = useSelector((state) => state.applicants.applicant);

  const HandleSignOut = async () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const HandleEdit = async () => {
    navigate("/profile");
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { width: "300px" },
      }}
      {...other}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">Account</Typography>
        <Typography color="text.secondary" variant="body2">
          {applicant?.name}
        </Typography>
      </Box>
      <MenuList
        disablePadding
        sx={{
          "& > *": {
            "&:first-of-type": {
              borderTopColor: "divider",
              borderTopStyle: "solid",
              borderTopWidth: "1px",
            },
            padding: "12px 16px",
          },
        }}
      >
        <MenuItem onClick={HandleEdit}>Edit profile</MenuItem>
        <MenuItem onClick={HandleSignOut}>Sign out</MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};
