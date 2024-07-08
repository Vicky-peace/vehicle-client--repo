import React, { useState, useEffect } from 'react';
import { Button, TextField, Card, CardContent, Typography } from '@mui/material';

const ManageVehicles: React.FC = () => {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [manufacturer, setManufacturer] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [year, setYear] = useState<number>(0);

  // Fetch vehicles on component mount (simulating useEffect for demo)
  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = () => {
    // Replace with actual API call to fetch vehicles
    // Example of mock data
    const mockVehicles = [
      { id: 1, manufacturer: 'Toyota', model: 'Camry', year: 2020 },
      { id: 2, manufacturer: 'Honda', model: 'Accord', year: 2019 },
    ];
    setVehicles(mockVehicles);
  };

  const addVehicle = () => {
    // Replace with actual API call to add vehicle
    const newVehicle = { manufacturer, model, year };
    setVehicles([...vehicles, newVehicle]);
    setManufacturer('');
    setModel('');
    setYear(0);
  };

  const deleteVehicle = (id: number) => {
    // Replace with actual API call to delete vehicle
    const updatedVehicles = vehicles.filter((vehicle) => vehicle.id !== id);
    setVehicles(updatedVehicles);
  };

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>Manage Vehicles</Typography>
      <Card className="mb-4">
        <CardContent>
          <Typography variant="h6">Add New Vehicle</Typography>
          <form className="mt-4" onSubmit={(e) => { e.preventDefault(); addVehicle(); }}>
            <TextField
              label="Manufacturer"
              variant="outlined"
              fullWidth
              className="mb-4"
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
            />
            <TextField
              label="Model"
              variant="outlined"
              fullWidth
              className="mb-4"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
            <TextField
              label="Year"
              variant="outlined"
              fullWidth
              className="mb-4"
              type="number"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
            />
            <Button type="submit" variant="contained" color="primary">Add Vehicle</Button>
          </form>
        </CardContent>
      </Card>

      <Typography variant="h6" gutterBottom>Existing Vehicles</Typography>
      {vehicles.map((vehicle) => (
        <Card key={vehicle.id} className="mb-4">
          <CardContent>
            <Typography variant="h6">{vehicle.manufacturer} - {vehicle.model}</Typography>
            <Typography variant="body1">Year: {vehicle.year}</Typography>
            <Button
              variant="contained"
              color="secondary"
              className="mt-2"
              onClick={() => deleteVehicle(vehicle.id)}
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ManageVehicles;
