import React, {useState} from 'react';
import { Typography, Card, CardContent, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { locationApi } from '../../../sevices/rtk-api/locationApi';
import { Location } from '../../../types/types';
import { toast } from 'react-toastify';

interface FormDataState {
  name: string;
  address: string;
  contact_phone: string,
}

const ManageLocations: React.FC = () => {
  const { data: locations = [], refetch } = locationApi.useGetLocationsQuery();
  const [addLocation] = locationApi.useAddLocationMutation();
  const [deleteLocation] = locationApi.useDeleteLocationMutation();
  const [updateLocation] = locationApi.useUpdateLocationMutation();

  const [formData, setFormData] = useState<FormDataState>({
    name: '',
    address: '',
    contact_phone: '',
  });
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteLocation = async (location_id: number) => {
    try {
      await deleteLocation(location_id).unwrap();
      refetch();
      toast.success('Location deleted successfully');
    } catch (error: any) {
      console.error("Failed to delete location:", error);
      toast.error('Failed to delete location');
      
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

   try {
    if(editingLocation){
       await updateLocation({
        id: editingLocation.location_id,
        updatedLocation: formData,
       }).unwrap();
      toast.success('Location updated successfully');   
    } else{
      await addLocation(formData).unwrap();
      toast.success('Location added successfully');
    }
    setFormData({ name: '', address: '', contact_phone: '' });
      setEditingLocation(null);
      refetch();
   } catch (error: any) {
    console.error("Failed to add/update location:", error);
    toast.error('Failed to add/update location');
  } finally {
    setIsModalOpen(false);
  }
};

const handleEditLocation = (location: Location) => {
  setFormData({
    name: location.name,
    address: location.address,
    contact_phone: location.contact_phone,
  });
  setEditingLocation(location);
  setIsModalOpen(true);
}

const handleCloseModal = () => {
  setFormData({ name: '', address: '', contact_phone: '' });
  setEditingLocation(null);
  setIsModalOpen(false);
}

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>Manage Locations</Typography>
      <Card className='mb-4'>
          <CardContent>
          <Typography variant="h4" gutterBottom>Add Locations</Typography>
          <form className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <TextField
              label="Contact Phone"
              variant="outlined"
              fullWidth
              name="contact_phone"
              value={formData.contact_phone}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" color="primary" className="sm:col-span-2">Add Location</Button>
          </form>
          </CardContent>
      </Card>
     
      <Card>
        <CardContent>
          <Typography variant="h6">Location List</Typography>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {locations.map((location: Location) => (
              <Card key={location.location_id} className="flex flex-col">
                <CardContent>
                  <Typography variant="h6" className='text-blue-800'>{location.name}</Typography>
                  <Typography variant="body2" className='text-gray-700'>{location.address}</Typography>
                  <Typography variant="body2" className='text-gray-700'>{location.contact_phone}</Typography>
                  <div className="flex justify-between mt-4">
                    <Button variant='contained' color='primary'onClick={() => handleEditLocation(location)}>Edit</Button>
                    <Button variant='contained' color='secondary' onClick={() => handleDeleteLocation(location.location_id)}>Delete</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>{editingLocation ? 'Update Location' : 'Add Location'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              name="address"
              value={formData.address}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              label="Contact Phone"
              variant="outlined"
              fullWidth
              name="contact_phone"
              value={formData.contact_phone}
              onChange={handleChange}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {editingLocation ? 'Update Location' : 'Add Location'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default ManageLocations;
