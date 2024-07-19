import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Users } from '../../types/types';
// import { localDomain } from '../../utils';
import { prodDomain } from '../../utils';

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: prodDomain }),
    tagTypes: ['Users'], 
    endpoints: (builder) => ({
        getUsers: builder.query<Users[], void>({
            query: () => '/users',
            providesTags: ['Users'], 
        }),
        getUser: builder.query<Users, number>({
            query: (user_id) => `/users/${user_id}`,
            providesTags: [{ type: 'Users', id: "LIST" }], 
        }),
        addUser: builder.mutation<Users, Partial<Users>>({
            query: (user) => ({
                url: '/users',
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['Users'], 
        }),
        updateUser: builder.mutation<Users, Partial<Users>>({
            query: ({user_id, ...patch}) => ({
                url: `/users/${user_id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: [{ type: 'Users', id: "LIST" }], 
        }),
        deleteUser: builder.mutation<void, number>({
            query: (user_id) => ({
                url: `/users/${user_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Users', id: "LIST" }], 
        }),
    }),
});


