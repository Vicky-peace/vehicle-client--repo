import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Reports: React.FC = () => {
  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>Reports</Typography>
      <Card>
        <CardContent>
          <Typography variant="h6">Generate Reports</Typography>
          {/* Report generation options */}
        </CardContent>
      </Card>
    </div>
  );
}

export default Reports;
