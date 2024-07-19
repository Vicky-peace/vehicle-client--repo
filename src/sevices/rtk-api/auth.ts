import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { localDomain } from '../../utils';
import { prodDomain } from '../../utils';


export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: prodDomain}),
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

