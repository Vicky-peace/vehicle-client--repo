import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Booking } from "../../types/types";
export const bookingsApi = createApi({
    reducerPath: "bookingsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://white-sky-095ea8f03.5.azurestaticapps.net" }),
    tagTypes: ["Booking"],
    endpoints: (builder) => ({
        getBookings: builder.query<Booking[], void>({
        query: () => "/bookings",
        providesTags: ["Booking"],
        }),
        getBooking: builder.query<Booking, number>({
        query: (userId) => `/bookings/users/${userId}`,
        providesTags: [{ type: "Booking", id: "LIST" }],
        }),
        addBooking: builder.mutation<Booking, Partial<Booking>>({
        query: (booking) => ({
            url: "/bookings",
            method: "POST",
            body: booking,
        }),
        invalidatesTags: ["Booking"],
        }),
        deleteBooking: builder.mutation<void, number>({
        query: (bookingId) => ({
            url: `/bookings/${bookingId}`,
            method: "DELETE",
        }),
        invalidatesTags: ["Booking"],
        }),
    }),
    });