import React from 'react';
import { Card, CardContent, Typography, Button, Avatar } from '@mui/material';
import { usersApi } from '../../../sevices/rtk-api/userApi';
import { Users } from '../../../types/types';
import { toast } from 'react-toastify';

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
    <div className="p-6 max-w-screen-xl mx-auto">
      <Typography variant="h4" gutterBottom className="text-center text-blue-800 mb-8">
        Manage Users
      </Typography>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user: Users) => (
          <Card key={user.user_id} className="flex flex-col shadow-md rounded-lg overflow-hidden border border-gray-200">
            <CardContent className="flex flex-col items-center p-6 bg-gray-50">
              <Avatar
                src={user.profile_image ? user.profile_image : '/default-avatar.png'}
                alt={user.full_name}
                className="w-28 h-28 mb-4 border-2 border-blue-800"
              />
              <Typography variant="h6" className="text-blue-800 mb-2 font-semibold text-lg">
                {user.full_name}
              </Typography>
              <div className="w-full">
                <div className="flex justify-between mb-2">
                  <Typography variant="body2" className="font-medium text-gray-700">
                    Name:
                  </Typography>
                  <Typography variant="body2" className="text-gray-800">
                    {user.full_name}
                  </Typography>
                </div>
                <div className="flex justify-between mb-2">
                  <Typography variant="body2" className="font-medium text-gray-700">
                    Email:
                  </Typography>
                  <Typography variant="body2" className="text-gray-800">
                    {user.email}
                  </Typography>
                </div>
                <div className="flex justify-between mb-2">
                  <Typography variant="body2" className="font-medium text-gray-700">
                    Contact:
                  </Typography>
                  <Typography variant="body2" className="text-gray-800">
                    {user.contact_phone}
                  </Typography>
                </div>
                <div className="flex justify-between mb-2">
                  <Typography variant="body2" className="font-medium text-gray-700">
                    Address:
                  </Typography>
                  <Typography variant="body2" className="text-gray-800">
                    {user.address}
                  </Typography>
                </div>
                <div className="flex justify-between mb-4">
                  <Typography variant="body2" className="font-medium text-gray-700">
                    Role:
                  </Typography>
                  <Typography variant="body2" className="text-gray-800">
                    {user.role}
                  </Typography>
                </div>
              </div>
              <Button
                variant="contained"
                color="error"
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
