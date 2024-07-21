import React from 'react';
import { Card, CardContent, Typography,Button, Avatar } from '@mui/material';
import { usersApi } from '../../../sevices/rtk-api/userApi';
import { Users } from '../../../types/types';
import {toast} from 'react-toastify';




const ManageUsers: React.FC = () => {
  const { data: users = [], refetch } = usersApi.useGetUsersQuery();
  const [deleteUser] = usersApi.useDeleteUserMutation();

  const handleDeleteUser = async (user_id: number) => {
    try {
      await deleteUser(user_id).unwrap();
      refetch();
      toast.success('User disabled');
    } catch (error: any) {
      console.error('Failed to delete user:', error);
      toast.error('Failed to delete user');
    }
  };

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom className="mb-6 text-center">
        Manage Users
      </Typography>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user: Users) => (
          <Card key={user.user_id} className="flex flex-col shadow-lg rounded-lg">
            <CardContent className="flex flex-col items-center p-6">
              <Avatar
                src={user.profile_image ? user.profile_image : '/default-avatar.png'}
                alt={user.full_name}
                className="w-24 h-24 mb-4"
              />
              <Typography variant="h6" className="text-blue-800 mb-2">
                {user.full_name}
              </Typography>
              <Typography variant="body2" className="text-gray-700 mb-1">
                {user.email}
              </Typography>
              <Typography variant="body2" className="text-gray-700 mb-1">
                {user.contact_phone}
              </Typography>
              <Typography variant="body2" className="text-gray-700 mb-1">
                {user.address}
              </Typography>
              <Typography variant="body2" className="text-gray-700 mb-4">
                {user.role}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleDeleteUser(user.user_id)}
                className="w-full"
              >
                Disable
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;