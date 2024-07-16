// import React from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home';
// import PeopleIcon from '@mui/icons-material/People';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import AnnouncementIcon from '@mui/icons-material/Announcement';
// import DescriptionIcon from '@mui/icons-material/Description';
// import ReceiptIcon from '@mui/icons-material/Receipt';
// import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
// import axios from 'axios'
// import RailViharLogo from '../../images/logo.png';
// import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';

  


// const AdminSidebar = () => {
//   const navigate = useNavigate();
//   const handleClickImg = () => {
//     navigate('/');
//   }
// const handleLogout = async () => {
//     try {
//       await axios.post('http://localhost:5001/api/logout');
//       localStorage.removeItem('admin-token');
//       navigate('/');
//     } catch (error) {
//       console.error('Logout failed', error);
//     }
//   };
//   return (
//      <div className="dashboard">
      
//       <div className="sidebar">
//         <ul>
//         <div className="logo-container">
//           <img src={RailViharLogo} alt="Rail Vihar Logo" className="logo" onClick={handleClickImg} />
//         </div>
//           <li>
//             <StyledButton onClick={() => navigate('/admin/profile')}>
//               Profile
//             </StyledButton>
//           </li>
//           <li>
//             <StyledButton onClick={() => navigate('/admin/users')}>
//               Users
//             </StyledButton>
//           </li>
//           <li>
//             <StyledButton onClick={() => navigate('/admin/payments')}>
//               Payments
//             </StyledButton>
//           </li>
//           <li>
//             <StyledButton onClick={() => navigate('/admin/payments/pending')}>
//               Pending Payments
//             </StyledButton>
//           </li>
//           <li>
//             <StyledButton onClick={() => navigate('/admin/total-money-collected')}>
//               Total Money
//             </StyledButton>
//           </li>
//           <li>
//             <StyledButton onClick={() => navigate('/admin/announcements')}>
//               Announcements
//             </StyledButton>
//           </li>
//           <li>
//             <StyledButton onClick={() => navigate('/admin/documents')}>
//               Documents
//             </StyledButton>
//           </li><li>
//             <StyledButton onClick={() => navigate('/admin/expenditures')}>
//               Expenditures
//             </StyledButton>
//           </li><li>
//             <StyledButton onClick={() => navigate('/admin/earnings')}>
//               Earnings
//             </StyledButton>
//           </li>
//           <li>
//             <Button variant="contained" color="primary" onClick={handleLogout}>
//               Logout
//             </Button>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };
// const StyledButton = styled(Button)(({ theme }) => ({
//   '&:hover': {
//     backgroundColor: theme.palette.primary.dark, // Darken background on hover
//   },
//   color: 'white', // Set font color to white
// }));
// export default AdminSidebar;
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Toolbar, Box,Button } from '@mui/material';
import { styled } from '@mui/system';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import DescriptionIcon from '@mui/icons-material/Description';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import RailViharLogo from '../../images/logo.png'; // Replace with the correct path to the logo image
import Message from '../Message'


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

const AdminSidebar = ({ handleLogout }) => {
  const navigate = useNavigate();

  const handleClickImg = () => {
    navigate('/');
  };

  return (
    <DrawerStyled variant="permanent">
      <Toolbar>
        <LogoContainer onClick={handleClickImg}>
          <Logo src={RailViharLogo} alt="Rail Vihar Logo" />
        </LogoContainer>
      </Toolbar>
      <Divider />
      <List>
        <Link to="/admin/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </Link>
        <Link to="/admin/users" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        </Link>
        <Link to="/admin/payments" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem button>
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Payments" />
          </ListItem>
        </Link>
        <Link to="/admin/payments/pending" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem button>
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary="Pending Payments" />
          </ListItem>
        </Link>
        <Link to="/admin/total-money-collected" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem button>
            <ListItemIcon>
              <AccountBalanceIcon />
            </ListItemIcon>
            <ListItemText primary="Total Money" />
          </ListItem>
        </Link>
        <Link to="/admin/announcements" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem button>
            <ListItemIcon>
              <AnnouncementIcon />
            </ListItemIcon>
            <ListItemText primary="Announcements" />
          </ListItem>
        </Link>
        <Link to="/admin/documents" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem button>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="Documents" />
          </ListItem>
        </Link>
        <Link to="/admin/expenditures" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem button>
            <ListItemIcon>
              <MonetizationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Expenditures" />
          </ListItem>
        </Link>
        <Link to="/admin/earnings" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem button>
            <ListItemIcon>
              <MonetizationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Earnings" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <Box sx={{ marginTop: 'auto', padding: 2 }}>
        <LogoutButton onClick={handleLogout} variant="contained">Logout</LogoutButton>
      </Box>
    </DrawerStyled>
  );
};

export default AdminSidebar;
