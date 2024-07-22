import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import BookIcon from '@mui/icons-material/Book';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import './UserLayout.css';  // Ensure this file exists for custom styles

const UserLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
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
    <div className="flex flex-col">
      {/* Header with Hamburger Menu for small screens */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
        <IconButton 
          onClick={toggleSidebar} 
          className="md:hidden text-black"
        >
          {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
       <div className='font-bold'> User DashBoard</div>
      </header>

      {/* Sidebar */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={isSidebarOpen}
        onClose={toggleSidebar}
        ref={sidebarRef}
        classes={{ paper: 'w-64 bg-gradient-to-r from-[#0A0A3E] via-[#1a1a66] to-[#2a2a99] text-white' }}
        className={`h-screen ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300`}
        ModalProps={{ keepMounted: true }} // Better performance on mobile
      >
        <List>
          <ListItem button component={Link} to="/" className="hover:bg-blue-700 text-white font-bold">
            <ListItemIcon>
              <HomeIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Home" className="text-white font-bold text-xl" />
          </ListItem>
          <ListItem button component={Link} to="/dashboard" className="hover:bg-blue-700 text-white font-bold">
            <ListItemIcon>
              <DashboardIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard Overview" className="text-white font-bold text-xl" />
          </ListItem>
          <ListItem button component={Link} to="/dashboard/booking-history" className="hover:bg-blue-700 text-white font-bold">
            <ListItemIcon>
              <HistoryIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Booking History" className="text-white font-bold text-xl" />
          </ListItem>
          <ListItem button component={Link} to="/dashboard/current-bookings" className="hover:bg-blue-700 text-white font-bold">
            <ListItemIcon>
              <BookIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Current Bookings" className="text-white font-bold text-xl" />
          </ListItem>
          <ListItem button component={Link} to="/dashboard/account-settings" className="hover:bg-blue-700 text-white font-bold">
            <ListItemIcon>
              <SettingsIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Account Settings" className="text-white font-bold text-xl" />
          </ListItem>
        </List>
      </Drawer>

      <main className="flex-1 p-4 bg-gray-100 min-h-screen pt-16 md:pt-0 md:ml-64 lg:ml-80">
  <Outlet />
</main>

    </div>
  );
}

export default UserLayout;
