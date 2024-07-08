import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ManageUsers: React.FC = () => {
  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>Manage Users</Typography>
      <Card>
        <CardContent>
          <Typography variant="h6">User List</Typography>
          {/* List users here */}
        </CardContent>
      </Card>
    </div>
  );
}

export default ManageUsers;
