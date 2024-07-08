import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const FleetManagement: React.FC = () => {
  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>Fleet Management</Typography>
      <Card>
        <CardContent>
          <Typography variant="h6">Fleet Details</Typography>
          {/* List and manage fleet details */}
        </CardContent>
      </Card>
    </div>
  );
}

export default FleetManagement;
