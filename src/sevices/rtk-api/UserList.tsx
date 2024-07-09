import React from 'react';
import { usersApi } from './userApi';


const UserList: React.FC = () => {
  const { data: users, error, isLoading } = usersApi.useGetUsersQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching users</div>;

  // Check if users is undefined before rendering
  if (!users) return <div>No users found</div>;

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.user_id}>{user.full_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
