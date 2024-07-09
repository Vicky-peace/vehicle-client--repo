// BookingPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { vehiclesApi } from "../../sevices/rtk-api/vehicleApi";
import BookingForm from './BookingForm';

const BookingPage: React.FC = () => {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const { data: vehicle, error, isLoading } = vehiclesApi.useGetVehicleQuery(parseInt(vehicleId || ''));

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Loading...</h2>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Vehicle not found</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <BookingForm vehicle={vehicle} />
    </div>
  );
};

export default BookingPage;