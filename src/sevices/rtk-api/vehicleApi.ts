import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { CarCardProps } from '../../types/types';

export const vehiclesApi = createApi({
    reducerPath: 'vehiclesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://carentalsys.azurewebsites.net/' }),
    "tagTypes": ["Vehicle"],
    endpoints: (builder) => ({
      getVehicles: builder.query<CarCardProps[], void>({
        query: () => '/vehicles/specs',
        providesTags: ['Vehicle'],
      }),
      getVehicle: builder.query<CarCardProps, number>({
        query: (id) => `/vehicles/specs/${id}`,
        providesTags: [{type: 'Vehicle', id: "LIST"}],
      
      }),
      addVehicle: builder.mutation<CarCardProps, Partial<CarCardProps>>({
        query: (newVehicle) => ({
          url: '/vehicleSpecs',
          method: 'POST',
          body: newVehicle,
        }),
        invalidatesTags: [{type: 'Vehicle', id: "LIST"}],
      }),
      updateVehicle: builder.mutation<CarCardProps,{id: number, updatedVehicle: CarCardProps}>({
        query: ({id,updatedVehicle}) => ({
          url: `/vehicles/${id}`,
          method: 'PUT',
          body: updatedVehicle,
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