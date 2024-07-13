import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { CarCardProps, Location } from '../../types/types';
import { bookingsApi } from '../../sevices/rtk-api/bookingApi';
import { locationApi } from '../../sevices/rtk-api/locationApi';
import { ClipLoader } from 'react-spinners';
import dayjs from 'dayjs';
import {toast} from 'react-toastify';

interface BookingFormProps {
  vehicle: CarCardProps;
}

interface BackendError {
  data?: {
    error?: {
      issues?: Array<{
        code: string;
        expected: string;
        received: string;
        path: string[];
        message: string;
      }>;
    };
  };
}

const BookingForm: React.FC<BookingFormProps> = ({ vehicle }) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [locationId, setLocationId] = useState<number | undefined>(undefined);

  const user = useSelector((state: RootState) => state.auth.user);

  console.log('User from Redux:', user);
  console.log('Vehicle prop:', vehicle);

  const { data: locations, isLoading: isLoadingLocations } = locationApi.useGetLocationsQuery();
  const [addBooking, { isLoading: isLoadingBooking }] = bookingsApi.useAddBookingMutation();

  const handleBooking = async () => {
    if (!startDate || !endDate || !locationId || !user || !vehicle) {
      alert('Please fill in all fields.');
      return;
    }

    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const rentalDays = end.diff(start, 'day');


    if (rentalDays <= 0) {
      toast.error('End date must be after start date');
      return;
    }

    const totalAmount = rentalDays * vehicle.rental_rate;

    const bookingData = {
      user_id: user.user_id,
      vehicle_id: vehicle.vehicle_id,
      location_id: locationId,
      booking_date: startDate,
      return_date: endDate,
      total_amount: totalAmount,
    };

    console.log('Booking data:', bookingData);

    try {
      await addBooking(bookingData).unwrap();
      toast.success(`Booking successful for ${vehicle.vehicleSpec.model} from ${startDate} to ${endDate}!`);
    } catch (error: unknown) {
      console.error('Booking error:', error);
      const backendError = error as BackendError;
      if (backendError.data?.error?.issues) {
        backendError.data.error.issues.forEach((issue) => {
          toast.error(issue.message);
        });
      } else {
        toast.error('Failed to book the vehicle. Please try again.');
      }
    }
  };
  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Book {vehicle.vehicleSpec.manufacturer} {vehicle.vehicleSpec.model}</h2>
      <div className="mb-4">
        <label htmlFor="startDate" className="block text-lg font-medium mb-2">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="endDate" className="block text-lg font-medium mb-2">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="location" className="block text-lg font-medium mb-2">Location:</label>
        <select
          id="location"
          value={locationId}
          onChange={(e) => setLocationId(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Select a location</option>
          {locations?.map((location: Location) => (
            <option key={location.location_id} value={location.location_id}>{location.name}</option>
          ))}
        </select>
        {isLoadingLocations && <ClipLoader size={24} color="blue" />}
      </div>
      <button
        onClick={handleBooking}
        className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 transition duration-200"
        disabled={isLoadingBooking}
      >
        {isLoadingBooking ? <ClipLoader size={24} color="white" /> : 'Confirm Booking'}
      </button>
    </div>
  );
};

export default BookingForm;