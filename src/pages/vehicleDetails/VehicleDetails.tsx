import React from 'react';
import { useParams } from 'react-router-dom';
import { vehiclesApi } from '../../sevices/rtk-api/vehicleApi';
import { ClipLoader } from 'react-spinners';
import BookingForm from '../booking/BookingForm';

const VehicleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const parsedVehicleId = id ? parseInt(id, 10) : NaN;

  if (isNaN(parsedVehicleId)) {
    console.error('Invalid vehicle ID:', id);
    return <div>Invalid vehicle ID</div>;
  }
  console.log('Vehicle ID:', id);

 
  const { data: vehicle, error, isLoading } = vehiclesApi.useGetVehicleQuery(parsedVehicleId);
console.log(vehicle);

  if (isLoading) return <div className="flex justify-center items-center h-screen"><ClipLoader color="#0000ff" size={150} /></div>;
  if (error) return <div>Error: Failed to fetch vehicle details</div>;
  if (!vehicle) return <div>Vehicle not found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Vehicle Details</h1>
      <div className="bg-white shadow-lg rounded-lg p-4">
        <img src={vehicle.vehicle_image} alt={`${vehicle.vehicleSpec.manufacturer} ${vehicle.vehicleSpec.model}`} className="w-full h-64 object-cover rounded mb-4" />
        <div className="text-lg">
          <p><strong>Manufacturer:</strong> {vehicle.vehicleSpec.manufacturer}</p>
          <p><strong>Model:</strong> {vehicle.vehicleSpec.model}</p>
          <p><strong>Year:</strong> {vehicle.vehicleSpec.year}</p>
          <p><strong>Fuel Type:</strong> {vehicle.vehicleSpec.fuel_type}</p>
          <p><strong>Rental Rate:</strong> ${vehicle.rental_rate} per day</p>
          <p><strong>Availability:</strong> {vehicle.availability ? 'Available' : 'Not Available'}</p>
          <p><strong>Features:</strong> {vehicle.vehicleSpec.features}</p>
        </div>
      </div>
      <BookingForm vehicle={vehicle} />
    </div>
  );
};

export default VehicleDetails;
