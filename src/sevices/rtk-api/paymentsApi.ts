import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TPayment {
    booking_id: number;
    total_amount: number;
    payment_status: string;
    payment_date: string;
    payment_method: string;
    transaction_id: string;
    created_at: string;
    updated_at: string;
    url: string;
  }

  export const paymentsApi = createApi({
    reducerPath: 'paymentsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://carentalsys.azurewebsites.net'}),
    tagTypes: ['Payment'],
    endpoints: (builder) => ({
        getPayments: builder.query<TPayment[], void>({
            query: () => '/payments',
            providesTags: ['Payment']
        }),
        getPayment: builder.query<TPayment, number>({
            query: (booking_id) => `/payments/${booking_id}`,
            providesTags: [{type: 'Payment', id: 'LIST'}]
        }),
        addPayment: builder.mutation<TPayment, Partial<TPayment>>({
            query: (newPayment) => ({
                url: '/checkout-session',
                method: 'POST',
                body: newPayment
            }),
            invalidatesTags: ['Payment']
        }),
        updatePayment: builder.mutation<TPayment, {id: number, updatedPayment: Partial<TPayment>}>({
            query: ({id, updatedPayment}) => ({
                url: `/payments/${id}`,
                method: 'PUT',
                body: updatedPayment
            }),
            invalidatesTags: ['Payment']
        }),
        deletePayment: builder.mutation<void, number>({
            query: (id) => ({
                url: `/payments/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Payment']
        })
    })
  })