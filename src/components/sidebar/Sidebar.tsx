import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import BookIcon from '@mui/icons-material/Book';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import Logout from '../../pages/Dashboard/user/Logout';


const Sidenav: React.FC = () => {
    return (
        <Drawer
            variant="permanent"
            className="h-screen w-64 flex-shrink-0 bg-[#0A0A3E] text-white md:w-1/5 lg:w-1/6"
        >
            <List className="mt-4">
                <ListItem button component={Link} to="/" className="hover:bg-gray-700">
                    <ListItemIcon className="text-white">
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard Overview" />
                </ListItem>
                <ListItem button component={Link} to="/dashboard/booking-history" className="hover:bg-gray-700">
                    <ListItemIcon className="text-white">
                        <HistoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Booking History" />
                </ListItem>
                <ListItem button component={Link} to="/dashboard/current-bookings" className="hover:bg-gray-700">
                    <ListItemIcon className="text-white">
                        <BookIcon />
                    </ListItemIcon>
                    <ListItemText primary="Current Bookings" />
                </ListItem>
                <ListItem button component={Link} to="/dashboard/account-settings" className="hover:bg-gray-700">
                    <ListItemIcon className="text-white">
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Account Settings" />
                </ListItem>
                <Logout/>
            </List>
        </Drawer>
    );
};

export default Sidenav;
