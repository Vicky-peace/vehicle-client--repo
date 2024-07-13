import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface TUsers {
    user_id: number;
    full_name: string;
    email: string;
    contact_phone: string;
    address: string;
    role: string;
    profile_image: string;
}

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    tagTypes: ['Users'], 
    endpoints: (builder) => ({
        getUsers: builder.query<TUsers[], void>({
            query: () => '/users',
            providesTags: ['Users'], 
        }),
        getUser: builder.query<TUsers, number>({
            query: (user_id) => `/users/${user_id}`,
            providesTags: [{ type: 'Users', id: "LIST" }], 
        }),
        addUser: builder.mutation<TUsers, Partial<TUsers>>({
            query: (user) => ({
                url: '/users',
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['Users'], 
        }),
        updateUser: builder.mutation<TUsers, Partial<TUsers>>({
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


