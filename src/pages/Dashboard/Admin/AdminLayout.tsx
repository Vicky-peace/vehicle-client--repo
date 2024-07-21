import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PeopleIcon from '@mui/icons-material/People';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SupportIcon from '@mui/icons-material/Support';
import CommuteIcon from '@mui/icons-material/Commute';
import HomeIcon from '@mui/icons-material/Home';
import './AdminLayout.css';

const AdminLayout: React.FC = () => {
  return (
    <div className="flex">
      <Drawer
        variant="permanent"
        anchor="left"
        className="w-64"
        classes={{ paper: 'w-64 bg-gradient-to-r from-[#0A0A3E] via-[#1a1a66] to-[#2a2a99] text-white' }}
      >
        <List>
          <ListItem button component={Link} to="/admin" className="hover:bg-blue-700 text-white font-bold">
            <ListItemIcon>
              <DashboardIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" className='text-white font-bold text-3xl'/>
          </ListItem>
          <ListItem button component={Link} to="/admin/manage-vehicles" className="hover:bg-blue-700 text-white font-bold">
            <ListItemIcon>
              <DirectionsCarIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Manage Vehicles" className='text-white font-bold text-3xl'/>
          </ListItem>
          <ListItem button component={Link} to="/admin/manage-users" className="hover:bg-blue-700 text-white font-bold">
            <ListItemIcon>
              <PeopleIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Manage Users" className='text-white font-bold text-3xl'/>
          </ListItem>
          <ListItem button component={Link} to="/admin/manage-locations" className="hover:bg-blue-700 text-bold">
            <ListItemIcon>
              <LocationOnIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Manage Locations" className="text-white font-bold text-3xl" />
          </ListItem>
          <ListItem button component={Link} to="/admin/customer-support-tickets" className="hover:bg-blue-700 text-bold">
            <ListItemIcon>
              <SupportIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Customer Support" className="text-white font-bold text-3xl" />
          </ListItem>
          <ListItem button component={Link} to="/admin/fleet-management" className="hover:bg-blue-700 text-bold">
            <ListItemIcon>
              <CommuteIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Fleet Management" className="text-white font-bold text-3xl" />
          </ListItem>
          <ListItem button component={Link} to="/" className="hover:bg-blue-700 text-bold">
            <ListItemIcon>
              <HomeIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Home" className="text-white font-bold text-3xl" />
          </ListItem>
        </List>
      </Drawer>
      <main className="flex-1 p-4 bg-gray-100 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
