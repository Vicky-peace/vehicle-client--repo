import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { Fleet } from '../../types/types';

export const fleetApi = createApi({
    reducerPath: 'fleetApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://carentalsys.azurewebsites.net' }),
    "tagTypes": ["FleetManagement"],
    endpoints: (builder) => ({
      getFleets: builder.query<Fleet[], void>({
        query: () => '/fleet',
        providesTags: ['FleetManagement'],
      }),
      getFleet: builder.query<Fleet, number>({
        query: (id) => `/fleet/${id}`,
        providesTags: [{type: 'FleetManagement', id: "LIST"}],
      
      }),
      addFleet: builder.mutation<Fleet, Partial<Fleet>>({
        query: (newVehicle) => ({
          url: '/fleet',
          method: 'POST',
          body: newVehicle,
        }),
        invalidatesTags: [{type: 'FleetManagement', id: "LIST"}],
      }),
      updateFleet: builder.mutation<Fleet,{id: number, updatedVehicle: Fleet}>({
        query: ({id,updatedVehicle}) => ({
          url: `/fleet/${id}`,
          method: 'PUT',
          body: updatedVehicle,
        }),
        invalidatesTags: [{type: 'FleetManagement', id: "LIST"}],
      }),
      deleteFleet: builder.mutation<void, number>({
        query: (id) => ({
          url: `/fleet/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: [{type: 'FleetManagement', id: "LIST"}],
      }),
    }),
  });