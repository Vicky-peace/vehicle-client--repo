import React from 'react';
import { Card, CardContent, Typography,Button } from '@mui/material';
import { usersApi } from '../../../sevices/rtk-api/userApi';
import { Users } from '../../../types/types';
import {toast} from 'react-toastify';




const ManageUsers: React.FC = () => {
  const {data: users = [], refetch} = usersApi.useGetUsersQuery();
  const [deleteUser] = usersApi.useDeleteUserMutation();
  
 

const handleDeleteUser = async (user_id: number) => {
  try {
    await deleteUser(user_id).unwrap();
    refetch();
    toast.success('User deleted successfully');
  } catch (error: any) {
    console.error("Failed to delete user:", error);
    toast.error('Failed to delete user');
  }
}
  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>Manage Users</Typography>
      <Card>
        <CardContent>
          <Typography variant="h6">User List</Typography>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user: Users) => (
              <Card key={user.user_id} className="flex flex-col">
                <CardContent>
                <Typography variant="h6" className="text-blue-800">{user.full_name}</Typography>
                  <Typography variant="body2" className="text-gray-700">{user.email}</Typography>
                  <Typography variant="body2" className="text-gray-700">{user.contact_phone}</Typography>
                  <Typography variant="body2" className="text-gray-700">{user.address}</Typography>
                  <Typography variant="body2" className="text-gray-700">{user.role}</Typography>
                  <div className="flex justify-between mt-4">
                    <Button variant='contained' color='primary' onClick={() => handleDeleteUser(user.user_id)}>Delete</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ManageUsers;
