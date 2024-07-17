import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'https://carentalsys.azurewebsites.net/'}),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials
            })
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: '/register',
                method: 'POST',
                body: credentials
            })
        })
    })
})

