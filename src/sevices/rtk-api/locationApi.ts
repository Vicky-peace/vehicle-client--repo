import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Location} from '../../types/types';

export const locationApi = createApi({
    reducerPath: 'locationApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    tagTypes: ['Location'],
    endpoints: (builder) => ({
      getLocations: builder.query<Location[], void>({
        query: () => '/locations',
        providesTags: ['Location'],
      }),
      getLocation: builder.query<Location, number>({
        query: (id) => `/locations/${id}`,
        providesTags: [{type: 'Location', id: "LIST"}],
      }),
      addLocation: builder.mutation<Location, Partial<Location>>({
        query: (newLocation) => ({
          url: '/locations',
          method: 'POST',
          body: newLocation,
        }),
        invalidatesTags: [{type: 'Location', id: "LIST"}],
      }),
      deleteLocation: builder.mutation<void, number>({
        query: (id) => ({
          url: `/locations/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: [{type: 'Location', id: "LIST"}],
      }),
    }),
})