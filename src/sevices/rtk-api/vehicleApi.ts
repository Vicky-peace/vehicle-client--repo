import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { Car } from '../../types/types';

export const vehiclesApi = createApi({
    reducerPath: 'vehiclesApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }), // Replace with your API base URL
    endpoints: (builder) => ({
      getVehicles: builder.query<Car[], void>({
        query: () => '/vehicles',
      }),
      addVehicle: builder.mutation<Car, Partial<Car>>({
        query: (vehicle) => ({
          url: '/vehicles',
          method: 'POST',
          body: vehicle,
        }),
      }),
      deleteVehicle: builder.mutation<void, number>({
        query: (vehicleId) => ({
          url: `/vehicles/${vehicleId}`,
          method: 'DELETE',
        }),
      }),
    }),
  });