import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ManageLocations: React.FC = () => {
  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>Manage Locations</Typography>
      <Card>
        <CardContent>
          <Typography variant="h6">Location List</Typography>
          {/* List and manage locations */}
        </CardContent>
      </Card>
    </div>
  );
}

export default ManageLocations;
