import React from 'react';
import { Button, TextField } from '@mui/material';

const AdminLogin: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl mb-4">Admin Login</h2>
        <form>
          <TextField label="Email" variant="outlined" fullWidth className="mb-4" />
          <TextField label="Password" variant="outlined" type="password" fullWidth className="mb-4" />
          <Button variant="contained" color="primary" fullWidth>Login</Button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
