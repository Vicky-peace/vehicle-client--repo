import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { usersApi } from '../../../sevices/rtk-api/userApi';
import { Users } from '../../../types/types';
import { toast } from 'react-toastify';
import axios from 'axios';
import { cloudinaryConfig } from '../../../cloudinary/CloudinaryConfig';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  Grid,
  CircularProgress
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const AccountSettings: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user ? user.user_id : null;

  const { data: userData, error: userError, isLoading: isUserLoading } = usersApi.useGetUserQuery(userId);
  const [updateUser] = usersApi.useUpdateUserMutation();

  const [email, setEmail] = useState(user?.email || '');
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(user?.profile_image || null);
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [contactPhone, setContactPhone] = useState(user?.contact_phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [isSaving, setIsSaving] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (userData) {
      setEmail(userData.email);
      setFullName(userData.full_name);
      setContactPhone(userData.contact_phone);
      setAddress(userData.address);
      setProfilePicPreview(userData.profile_image);
    }
  }, [userData]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    let profileImageUrl = user?.profile_image || '';

    if (profilePic) {
      const formData = new FormData();
      formData.append('file', profilePic);
      formData.append('upload_preset', cloudinaryConfig.uploadPreset);

      try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudname}/image/upload`, formData);
        profileImageUrl = response.data.secure_url;
      } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        toast.error('Failed to upload profile image');
        setIsSaving(false);
        return;
      }
    }

    const updatedUser: Partial<Users> = {
      email,
      full_name: fullName,
      contact_phone: contactPhone,
      address,
      profile_image: profileImageUrl,
    };

    try {
      if (userId) {
        await updateUser({ user_id: userId, ...updatedUser }).unwrap();
        toast.success('User updated successfully!');
        setOpenDialog(false);
      } else {
        toast.error('User ID is missing.');
      }
    } catch (error) {
      console.error('Failed to update user:', error);
      toast.error('Failed to update user.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setProfilePic(file);
      setProfilePicPreview(URL.createObjectURL(file));
    }
  };

  if (isUserLoading) return <div>Loading...</div>;
  if (userError) return <div>Error loading user data</div>;

  return (
    <div className="p-4">
      <Card className="w-full max-w-4xl mx-auto p-8 mb-8 shadow-lg">
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={3} className="flex items-center justify-center">
              <Avatar alt={fullName} src={profilePicPreview || ''} className="w-32 h-32" />
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <div className="flex flex-col space-y-2">
                <Typography variant="h5" className="font-bold text-blue-700">Name: {fullName}</Typography>
                <Typography variant="body1" className="font-medium text-gray-600">Email: {email}</Typography>
                <Typography variant="body1" className="font-medium text-gray-600">Contact: {contactPhone}</Typography>
                <Typography variant="body1" className="font-medium text-gray-600">Address: {address}</Typography>
              </div>
            </Grid>
          </Grid>
          <div className="mt-4 flex justify-end space-x-2">
            <IconButton color="primary" aria-label="upload picture" component="label">
              <input hidden accept="image/*" type="file" onChange={handleProfilePicChange} />
              <PhotoCamera />
            </IconButton>
            <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
              Update Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Update Profile</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSave} className="space-y-4">
            <TextField
              fullWidth
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="Contact Phone"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
            />
            <TextField
              fullWidth
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button type="submit" color="primary" disabled={isSaving} onClick={handleSave}>
            {isSaving ? <CircularProgress size={24} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AccountSettings;
