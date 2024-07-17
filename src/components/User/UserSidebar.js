import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Toolbar, Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import ReceiptIcon from '@mui/icons-material/Receipt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import RailViharLogo from '../../images/logo.png'; // Replace with the correct path to the logo image

const drawerWidth = 240;

const DrawerStyled = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
  marginBottom: '10px',
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const Logo = styled('img')({
  width: '80px',
  height: 'auto',
  borderRadius: '50%',
});

const LogoutButton = styled(Button)(({ theme }) => ({
  width: '100%',
  marginTop: 'auto',
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
}));

const UserSidebar = ({ handleLogout }) => {
  const navigate = useNavigate();

  const handleClickImg = () => {
    navigate('/');
  };

  return (
    <DrawerStyled variant="permanent">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
      <Toolbar>
        <LogoContainer onClick={handleClickImg}>
          <Logo src={RailViharLogo} alt="Rail Vihar Logo" />
        </LogoContainer>
      </Toolbar>
      <Divider />
      <List>
        <Link to="/dashboard/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </Link>
        <Link to="/dashboard/payments" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem button>
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary="My Payments" />
          </ListItem>
        </Link>
        <Link to="/dashboard/make-payment" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem button>
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Make Payment" />
          </ListItem>
        </Link>
        <Link to="/dashboard/expenditures" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem button>
            <ListItemIcon>
              <MonetizationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Expenditures" />
          </ListItem>
        </Link>
        <Link to="/dashboard/earnings" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem button>
            <ListItemIcon>
              <MonetizationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Earnings" />
          </ListItem>
        </Link>
        <Link to="/dashboard/update-profile" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Update Profile" />
          </ListItem>
        </Link>
        <Link to="/dashboard/change-password" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem button>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="Change Password" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <Box sx={{ marginTop: 'auto', padding: 2 }}>
        <LogoutButton onClick={handleLogout} variant="contained">
          Logout
        </LogoutButton>
      </Box>
    </DrawerStyled>
  );
};

export default UserSidebar;
