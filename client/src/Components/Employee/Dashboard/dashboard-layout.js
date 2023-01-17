import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DashboardNavbar } from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280
  }
}));

function checkUser(){
  const token = localStorage.getItem("authToken");
  if(token === null || token === undefined || token === ""){
    window.location.href = "/login";
    return;
  }
  
  const userType = JSON.parse(atob(token.split(".")[1])).userType;

  switch(userType){
    case 0:
      window.location.href = "/applicant/dashboard";
      break;
    case 1:
      window.location.href = "/admin/dashboard";
      break;
    case 2:
      break;
    case 3:
      window.location.href = "/executive/dashboard";
      break;
    default:
      window.location.href = "/login";
      break;
  } 
}

export const DashboardLayout = (props) => {
  const { children, tab } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar tab={tab} onSidebarOpen={() => setSidebarOpen(true)} />
      <DashboardSidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </>
  );
};
