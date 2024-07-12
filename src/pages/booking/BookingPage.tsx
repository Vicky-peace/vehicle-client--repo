import React from 'react';
import { useParams } from 'react-router-dom';
import { vehiclesApi } from "../../sevices/rtk-api/vehicleApi";
import BookingForm from './BookingForm';

const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const parsedVehicleId = id ? parseInt(id, 10) : NaN;

  if (isNaN(parsedVehicleId)) {
    console.error('Invalid vehicle ID:', id);
    return <div>Invalid vehicle ID</div>;
  }


 

  const { data: vehicle, error, isLoading } = vehiclesApi.useGetVehicleQuery(parsedVehicleId);

  console.log('Vehicle:', vehicle); 


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