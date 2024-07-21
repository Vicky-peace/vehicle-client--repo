import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { CustomerTickets } from '../../types/types';
// import { localDomain } from '../../utils';
import { prodDomain } from '../../utils';


export const ticketsApi = createApi({
    reducerPath: 'ticketsApi',
    baseQuery: fetchBaseQuery({ baseUrl: prodDomain }),
    "tagTypes": ["Tickets"],
    endpoints: (builder) => ({
      getTickets: builder.query<CustomerTickets[], void>({
        query: () => '/customer-support',
        providesTags: ['Tickets'],
      }),
      getTicket: builder.query<CustomerTickets, number>({
        query: (id) => `customer-support/${id}`,
        providesTags: [{type: 'Tickets', id: "LIST"}],
      
      }),
      addTicket: builder.mutation<CustomerTickets, Partial<CustomerTickets>>({
        query: (newTickets) => ({
          url: '/customer-support',
          method: 'POST',
          body: newTickets,
        }),
        invalidatesTags: [{type: 'Tickets', id: "LIST"}],
      }),
      updateTicket: builder.mutation<CustomerTickets,{id: number, updatedTicket: CustomerTickets}>({
        query: ({id,updatedTicket}) => ({
          url: `/customer-support/${id}`,
          method: 'PUT',
          body: updatedTicket,
        }),
        invalidatesTags: [{type: 'Tickets', id: "LIST"}],
      }),
      deleteTicktet: builder.mutation<void, number>({
        query: (id) => ({
          url: `/customer-support/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: [{type: 'Tickets', id: "LIST"}],
      }),
    }),
  });