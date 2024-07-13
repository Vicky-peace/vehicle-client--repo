import React, { useState } from 'react';
import { Button, TextField, Card, CardContent, Typography } from '@mui/material';
import { vehiclesApi } from '../../../sevices/rtk-api/vehicleApi';
import { CarCardProps } from '../../../types/types';

const ManageVehicles: React.FC = () => {
  const { data: vehicles = [], refetch } = vehiclesApi.useGetVehiclesQuery();
  const [addVehicle] = vehiclesApi.useAddVehicleMutation();
  const [deleteVehicle] = vehiclesApi.useDeleteVehicleMutation();

  const [manufacturer, setManufacturer] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [year, setYear] = useState<number>(0);
  const [fuelType, setFuelType] = useState<string>('');
  const [engineCapacity, setEngineCapacity] = useState<string>('');
  const [transmission, setTransmission] = useState<string>('');
  const [seatingCapacity, setSeatingCapacity] = useState<number>(0);
  const [color, setColor] = useState<string>('');
  const [features, setFeatures] = useState<string>('');
  const [rentalRate, setRentalRate] = useState<number>(0);
  const [availability, setAvailability] = useState<boolean>(false);
  const [vehicleImage, setVehicleImage] = useState<string>('');

  const handleAddVehicle = async () => {
    try {
      const vehicleData = {
        vehicleSpec: {
          manufacturer,
          model,
          year,
          fuel_type: fuelType,
          engine_capacity: engineCapacity,
          transmission,
          seating_capacity: seatingCapacity,
          color,
          features,
        },
        rental_rate: rentalRate,
        availability,
        vehicle_image: vehicleImage,
      };

      await addVehicle(vehicleData).unwrap();
      refetch();
      clearForm();
    } catch (error) {
      console.error('Failed to add vehicle:', error);
    }
  };

  const clearForm = () => {
    setManufacturer('');
    setModel('');
    setYear(0);
    setFuelType('');
    setEngineCapacity('');
    setTransmission('');
    setSeatingCapacity(0);
    setColor('');
    setFeatures('');
    setRentalRate(0);
    setAvailability(false);
    setVehicleImage('');
  };

  const handleDeleteVehicle = async (id: number) => {
    try {
      await deleteVehicle(id).unwrap();
      refetch();
    } catch (error) {
      console.error('Failed to delete vehicle:', error);
    }
  };

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>Manage Vehicles</Typography>
      <Card className="mb-4">
        <CardContent>
          <Typography variant="h6">Add New Vehicle</Typography>
          <form className="mt-4" onSubmit={(e) => { e.preventDefault(); handleAddVehicle(); }}>
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
            <TextField
              label="Fuel Type"
              variant="outlined"
              fullWidth
              className="mb-4"
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
            />
            <TextField
              label="Engine Capacity"
              variant="outlined"
              fullWidth
              className="mb-4"
              value={engineCapacity}
              onChange={(e) => setEngineCapacity(e.target.value)}
            />
            <TextField
              label="Transmission"
              variant="outlined"
              fullWidth
              className="mb-4"
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
            />
            <TextField
              label="Seating Capacity"
              variant="outlined"
              fullWidth
              className="mb-4"
              type="number"
              value={seatingCapacity}
              onChange={(e) => setSeatingCapacity(parseInt(e.target.value))}
            />
            <TextField
              label="Color"
              variant="outlined"
              fullWidth
              className="mb-4"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <TextField
              label="Features"
              variant="outlined"
              fullWidth
              className="mb-4"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
            />
            <TextField
              label="Rental Rate"
              variant="outlined"
              fullWidth
              className="mb-4"
              type='number'
              value={rentalRate}
              onChange={(e) => setRentalRate(parseInt(e.target.value))}
            />
            <TextField
              label="Availability"
              variant="outlined"
              fullWidth
              className="mb-4"
              value={availability.toString()}
              onChange={(e) => setAvailability(e.target.value === 'true')}
            />
            <TextField
              label="Vehicle Image"
              variant="outlined"
              fullWidth
              className="mb-4"
              value={vehicleImage}
              onChange={(e) => setVehicleImage(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary">Add Vehicle</Button>
          </form>
        </CardContent>
      </Card>

      <Typography variant="h6" gutterBottom>Existing Vehicles</Typography>
      {vehicles.map((vehicle: CarCardProps) => (
        <Card key={vehicle.vehicle_id} className="mb-4">
          <CardContent>
            <Typography variant="h6">{vehicle.vehicleSpec.manufacturer} - {vehicle.vehicleSpec.model}</Typography>
            <Typography variant="body1">Year: {vehicle.vehicleSpec.year}</Typography>
            <Button
              variant="contained"
              color="secondary"
              className="mt-2"
              onClick={() => handleDeleteVehicle(vehicle.vehicle_id)}
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