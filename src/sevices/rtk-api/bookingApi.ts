import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Booking } from "../../types/types";
export const bookingsApi = createApi({
    reducerPath: "bookingsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
    endpoints: (builder) => ({
        getBookings: builder.query<Booking[], void>({
        query: () => "/bookings",
        }),
        getBooking: builder.query<Booking, number>({
        query: (id) => `/bookings/user${id}`,
        }),
        addBooking: builder.mutation<Booking, Partial<Booking>>({
        query: (booking) => ({
            url: "/bookings",
            method: "POST",
            body: booking,
        }),
        }),
        deleteBooking: builder.mutation<void, number>({
        query: (bookingId) => ({
            url: `/bookings/${bookingId}`,
            method: "DELETE",
        }),
        }),
    }),
    });