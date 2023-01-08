import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, Avatar, Badge, Box, Divider, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Bell as BellIcon } from '../icons/bell';
import { UserCircle as UserCircleIcon } from '../icons/user-circle';
import { AccountPopover } from './account-popover';
import { useSelector } from 'react-redux';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 1px 4px rgba(100, 116, 139, 0.12)'
}));

export const DashboardNavbar = (props) => {
  const { tab, onSidebarOpen, ...other } = props;
  const settingsRef = useRef(null);
  const [openAccountPopover, setOpenAccountPopover] = useState(false);

  const admin = useSelector((state) => state.admins.currentAdmin);

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280
          },
          width: {
            lg: 'calc(100% - 280px)'
          }
        }}
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none'
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
            <IconButton sx={{ ml: 1, "&.Mui-disabled": {color: "black"} }} disabled>
              <Typography variant='h5'> {tab} </Typography>
            </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 1, mr: 3 }}>
              <Badge
                badgeContent={4}
                color="primary"
                variant="dot"
              >
                <BellIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>
          <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 5, borderColor: "black" }}/>
          <Avatar
            onClick={() => setOpenAccountPopover(true)}
            ref={settingsRef}
            alt={admin?.name}
            sx={{
              cursor: 'pointer',
              height: 40,
              width: 40,
              ml: 3,
              mr: 1
            }}
            src="/static/images/avatars/avatar_1.png"
          >
            {/* <UserCircleIcon fontSize="small" /> */}
          </Avatar>
        </Toolbar>
      </DashboardNavbarRoot>
      <AccountPopover
        anchorEl={settingsRef.current}
        open={openAccountPopover}
        onClose={() => setOpenAccountPopover(false)}
      />
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};
