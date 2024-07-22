import React, { useState, useEffect, useRef } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import BookIcon from '@mui/icons-material/Book';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import Logout from '../../pages/Dashboard/user/Logout';
import './Sidenav.css';

const Sidenav: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            <header className="fixed top-0 left-0 w-full bg-white shadow-md z-10 md:hidden">
                <IconButton 
                    onClick={toggleSidebar} 
                    className="text-black"
                >
                    <MenuIcon />
                </IconButton>
            </header>
            <Drawer
                variant={isSidebarOpen ? 'temporary' : 'permanent'}
                anchor="left"
                open={isSidebarOpen}
                onClose={toggleSidebar}
                ref={sidebarRef}
                className={`h-screen w-64 flex-shrink-0 bg-[#0A0A3E] text-white md:w-1/5 lg:w-1/6 ${isSidebarOpen ? '' : 'hidden md:block'}`}
                classes={{ paper: 'w-64 bg-[#0A0A3E] text-white' }}
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
                    <Logout />
                </List>
            </Drawer>
        </div>
    );
};

export default Sidenav;
