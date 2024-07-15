import React, { useState } from 'react';
import { Typography, Card, CardContent, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { vehiclesApi } from '../../../sevices/rtk-api/vehicleApi';
import { CarCardProps } from '../../../types/types';

interface FormDataState {
  rental_rate: number;
  availability: boolean;
  vehicle_image: File | null;
  manufacturer: string;
  model: string;
  year: number;
  fuel_type: string;
  engine_capacity: string;
  transmission: string;
  seating_capacity: number;
  color: string;
  features: string;
}

const ManageVehicles: React.FC = () => {
  const { data: vehicles = [], refetch } = vehiclesApi.useGetVehiclesQuery();
  const [addVehicle] = vehiclesApi.useAddVehicleMutation();
  const [deleteVehicle] = vehiclesApi.useDeleteVehicleMutation();

  const [formData, setFormData] = useState<FormDataState>({
    rental_rate: 0,
    availability: true,
    vehicle_image: null,
    manufacturer: '',
    model: '',
    year: 0,
    fuel_type: '',
    engine_capacity: '',
    transmission: '',
    seating_capacity: 0,
    color: '',
    features: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
    if (type === 'file' && files) {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let imageUrl = '';
      if (formData.vehicle_image) {
        const formDataImage = new FormData();
        formDataImage.append('file', formData.vehicle_image);
        formDataImage.append('upload_preset', 'upload');

        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dor27a2ut/image/upload',
          formDataImage
        );

        if (response.status === 200) {
          imageUrl = response.data.secure_url;
        } else {
          console.error('Failed to upload image:', response.statusText);
          toast.error('Failed to upload image');
          return;
        }
      }

      const vehicleData = {
        vehicleSpec: {
          manufacturer: formData.manufacturer,
          model: formData.model,
          year: formData.year,
          fuel_type: formData.fuel_type,
          engine_capacity: formData.engine_capacity,
          transmission: formData.transmission,
          seating_capacity: formData.seating_capacity,
          color: formData.color,
          features: formData.features,
        },
        vehicle: {
          rental_rate: formData.rental_rate,
          availability: formData.availability,
          vehicle_image: imageUrl,
        }
      };

      await addVehicle(vehicleData).unwrap();
      refetch();
      toast.success('Vehicle added successfully');
      clearForm();

    } catch (error: any) {
      console.error('Error:', error.message);
      toast.error('Failed to add vehicle');
    }
  };

  const clearForm = () => {
    setFormData({
      rental_rate: 0,
      availability: true,
      vehicle_image: null,
      manufacturer: '',
      model: '',
      year: 0,
      fuel_type: '',
      engine_capacity: '',
      transmission: '',
      seating_capacity: 0,
      color: '',
      features: '',
    });
  };

  const handleDeleteVehicle = async (id: number) => {
    try {
      await deleteVehicle(id).unwrap();
      refetch();
      toast.success('Vehicle deleted successfully');
    } catch (error) {
      console.error('Failed to delete vehicle:', error);
      toast.error('Failed to delete vehicle');
    }
  };

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>Manage Vehicles</Typography>
      <Card className="mb-4">
        <CardContent>
          <Typography variant="h6">Add New Vehicle</Typography>
          <form className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <TextField
              label="Manufacturer"
              variant="outlined"
              fullWidth
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
            />
            <TextField
              label="Model"
              variant="outlined"
              fullWidth
              name="model"
              value={formData.model}
              onChange={handleChange}
            />
            <TextField
              label="Year"
              variant="outlined"
              fullWidth
              type="number"
              name="year"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
            />
            <TextField
              label="Fuel Type"
              variant="outlined"
              fullWidth
              name="fuel_type"
              value={formData.fuel_type}
              onChange={handleChange}
            />
            <TextField
              label="Engine Capacity"
              variant="outlined"
              fullWidth
              name="engine_capacity"
              value={formData.engine_capacity}
              onChange={handleChange}
            />
            <TextField
              label="Transmission"
              variant="outlined"
              fullWidth
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
            />
            <TextField
              label="Seating Capacity"
              variant="outlined"
              fullWidth
              type="number"
              name="seating_capacity"
              value={formData.seating_capacity}
              onChange={(e) => setFormData({ ...formData, seating_capacity: parseInt(e.target.value) })}
            />
            <TextField
              label="Color"
              variant="outlined"
              fullWidth
              name="color"
              value={formData.color}
              onChange={handleChange}
            />
            <TextField
              label="Features"
              variant="outlined"
              fullWidth
              name="features"
              value={formData.features}
              onChange={handleChange}
            />
            <TextField
              label="Rental Rate"
              variant="outlined"
              fullWidth
              type="number"
              name="rental_rate"
              value={formData.rental_rate}
              onChange={(e) => setFormData({ ...formData, rental_rate: parseInt(e.target.value) })}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="availability"
                  checked={formData.availability}
                  onChange={handleChange}
                />
              }
              label="Availability"
              className="sm:col-span-2"
            />
            <div className="sm:col-span-2">
              <input
                type="file"
                accept="image/*"
                name="vehicle_image"
                onChange={handleChange}
                style={{ marginTop: '16px', marginBottom: '8px' }}
              />
            </div>
            <Button type="submit" variant="contained" color="primary" className="sm:col-span-2">Add Vehicle</Button>
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
