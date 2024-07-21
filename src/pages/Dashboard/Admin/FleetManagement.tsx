import React, { useState, useEffect } from 'react';
import {
  Typography, Card, CardContent, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
  MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import { ClipLoader } from 'react-spinners';
import { fleetApi } from '../../../sevices/rtk-api/fleetApi';
import { vehiclesApi } from '../../../sevices/rtk-api/vehicleApi';
import { Fleet, CarCardProps } from '../../../types/types';
import { toast } from 'react-toastify';
import { SelectChangeEvent } from '@mui/material/Select';

interface FormDataState {
  vehicle_id: number;
  acquisition_date: string;
  depreciation_rate: number;
  current_value: number;
  maintenance_cost: number;
  status: 'Active' | 'Inactive';
}

const FleetManagement: React.FC = () => {
  const { data: fleet = [], refetch, isLoading: isFetching } = fleetApi.useGetFleetsQuery();
  const { data: vehicles = [] } = vehiclesApi.useGetVehiclesQuery();
  const [addFleet, { isLoading: isAdding }] = fleetApi.useAddFleetMutation();
  const [updateFleet, { isLoading: isUpdating }] = fleetApi.useUpdateFleetMutation();
  console.log(fleet)
  const [formData, setFormData] = useState<FormDataState>({
    vehicle_id: 0,
    acquisition_date: '',
    depreciation_rate: 0,
    current_value: 0,
    maintenance_cost: 0,
    status: 'Active',
  });
  const [editingFleet, setEditingFleet] = useState<Fleet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isFetching) {
      refetch();
    }
  }, [isFetching, refetch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const numericFields = ['depreciation_rate', 'current_value', 'maintenance_cost'];
    setFormData({
      ...formData,
      [name]: numericFields.includes(name) ? parseFloat(value) : value,
    });
  }

  const handleSelectChange = (e: SelectChangeEvent<number | 'Active' | 'Inactive'>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name as string]: value });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (editingFleet) {
        await updateFleet({
          id: editingFleet.fleet_id,
          updatedVehicle: { ...formData, fleet_id: editingFleet.fleet_id },
        }).unwrap();
        toast.success('Fleet updated successfully');
      } else {
        await addFleet(formData).unwrap();
        toast.success('Fleet added successfully');
      }
      setFormData({ vehicle_id: 0, acquisition_date: '', depreciation_rate: 0, current_value: 0, maintenance_cost: 0, status: 'Active' });
      setEditingFleet(null);
      refetch();
    } catch (error: any) {
      console.error("Failed to add/update fleet:", error);
      toast.error('Failed to add/update fleet');
    } finally {
      setIsModalOpen(false);
    }
  }

  const handleEditFleet = (fleet: Fleet) => {
    setFormData({
      vehicle_id: fleet.vehicle_id,
      acquisition_date: fleet.acquisition_date,
      depreciation_rate: fleet.depreciation_rate,
      current_value: fleet.current_value,
      maintenance_cost: fleet.maintenance_cost,
      status: fleet.status,
    });
    setEditingFleet(fleet);
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setFormData({ vehicle_id: 0, acquisition_date: '', depreciation_rate: 0, current_value: 0, maintenance_cost: 0, status: 'Active' });
    setEditingFleet(null);
    setIsModalOpen(false);
  }

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>Fleet Management</Typography>
      <Card className='mb-4'>
        <CardContent>
          <Typography variant="h4" gutterBottom>Add Fleet</Typography>
          <form className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="vehicle-id-label">Vehicle</InputLabel>
              <Select
                labelId="vehicle-id-label"
                label="Vehicle"
                name="vehicle_id"
                value={formData.vehicle_id}
                onChange={(e) => handleSelectChange(e as SelectChangeEvent<number>)}
              >
                {vehicles.map((vehicle: CarCardProps) => (
                  <MenuItem key={vehicle.vehicle_id} value={vehicle.vehicle_id}>
                    {vehicle.vehicleSpec.manufacturer} - {vehicle.vehicleSpec.model}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Acquisition Date"
              variant="outlined"
              fullWidth
              name="acquisition_date"
              type="text"
              value={formData.acquisition_date}
              onChange={handleInputChange}
            />
            <TextField
              label="Depreciation Rate"
              variant="outlined"
              fullWidth
              name="depreciation_rate"
              type="number"
              value={formData.depreciation_rate}
              onChange={handleInputChange}
            />
            <TextField
              label="Current Value"
              variant="outlined"
              fullWidth
              name="current_value"
              type="number"
              value={formData.current_value}
              onChange={handleInputChange}
            />
            <TextField
              label="Maintenance Cost"
              variant="outlined"
              fullWidth
              name="maintenance_cost"
              type="number"
              value={formData.maintenance_cost}
              onChange={handleInputChange}
            />
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                label="Status"
                name="status"
                value={formData.status}
                onChange={(e) => handleSelectChange(e as SelectChangeEvent<'Active' | 'Inactive'>)}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary" className="sm:col-span-2" disabled={isAdding || isUpdating}>
              {isAdding || isUpdating ? <ClipLoader size={20} color="#fff" /> : (editingFleet ? 'Update Fleet' : 'Add Fleet')}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6">Fleet List</Typography>
          {isFetching ? (
            <div className="flex justify-center items-center h-full">
              <ClipLoader size={50} color="#123abc" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {fleet.map((fleetItem: Fleet) => (
                <Card key={fleetItem.fleet_id} className="flex flex-col">
                  <CardContent>
                    <Typography variant="h6" className='text-blue-800'>{fleetItem.vehicle_id}</Typography>
                    <Typography variant="body2" className='text-gray-700'>Acquisition Date: {fleetItem.acquisition_date}</Typography>
                    <Typography variant="body2" className='text-gray-700'>Depreciation Rate: {fleetItem.depreciation_rate}%</Typography>
                    <Typography variant="body2" className='text-gray-700'>Current Value: {fleetItem.current_value}</Typography>
                    <Typography variant="body2" className='text-gray-700'>Maintenance Cost: {fleetItem.maintenance_cost}</Typography>
                    <Typography variant="body2" className='text-gray-700'>Status: {fleetItem.status}</Typography>
                    <div className="flex justify-between mt-4">
                      <Button variant='contained' color='primary' onClick={() => handleEditFleet(fleetItem)} disabled={isUpdating}>
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>{editingFleet ? 'Edit Fleet' : 'Add Fleet'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="vehicle-id-label">Vehicle</InputLabel>
              <Select
                labelId="vehicle-id-label"
                label="Vehicle"
                name="vehicle_id"
                value={formData.vehicle_id}
                onChange={(e) => handleSelectChange(e as SelectChangeEvent<number>)}
              >
                {vehicles.map((vehicle: CarCardProps) => (
                  <MenuItem key={vehicle.vehicle_id} value={vehicle.vehicle_id}>
                    {vehicle.vehicleSpec.manufacturer} - {vehicle.vehicleSpec.model}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Acquisition Date"
              variant="outlined"
              fullWidth
              name="acquisition_date"
              type="text"
              value={formData.acquisition_date}
              onChange={handleInputChange}
            />
            <TextField
              label="Depreciation Rate"
              variant="outlined"
              fullWidth
              name="depreciation_rate"
              type="number"
              value={formData.depreciation_rate}
              onChange={handleInputChange}
            />
            <TextField
              label="Current Value"
              variant="outlined"
              fullWidth
              name="current_value"
              type="number"
              value={formData.current_value}
              onChange={handleInputChange}
            />
            <TextField
              label="Maintenance Cost"
              variant="outlined"
              fullWidth
              name="maintenance_cost"
              type="number"
              value={formData.maintenance_cost}
              onChange={handleInputChange}
            />
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                label="Status"
                name="status"
                value={formData.status}
                onChange={(e) => handleSelectChange(e as SelectChangeEvent<'Active' | 'Inactive'>)}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="secondary">Cancel</Button>
            <Button type="submit" color="primary" disabled={isAdding || isUpdating}>
              {isAdding || isUpdating ? <ClipLoader size={20} color="#fff" /> : (editingFleet ? 'Update Fleet' : 'Add Fleet')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default FleetManagement;