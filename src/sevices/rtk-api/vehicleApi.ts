import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { Car } from '../../types/types';

export const vehiclesApi = createApi({
    reducerPath: 'vehiclesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    "tagTypes": ["Vehicle"],
    endpoints: (builder) => ({
      getVehicles: builder.query<Car[], void>({
        query: () => '/vehicles',
        providesTags: ['Vehicle'],
      }),
      getVehicle: builder.query<Car, number>({
        query: (vehicleId) => `/vehicles/${vehicleId}`,
        providesTags: [{type: 'Vehicle', id: "LIST"}],
      
      }),
      addVehicle: builder.mutation<Car, Partial<Car>>({
        query: (vehicle) => ({
          url: '/vehicles',
          method: 'POST',
          body: vehicle,
        }),
        invalidatesTags: [{type: 'Vehicle', id: "LIST"}],
      }),
      deleteVehicle: builder.mutation<void, number>({
        query: (vehicleId) => ({
          url: `/vehicles/${vehicleId}`,
          method: 'DELETE',
        }),
        invalidatesTags: [{type: 'Vehicle', id: "LIST"}],
      }),
    }),
  });