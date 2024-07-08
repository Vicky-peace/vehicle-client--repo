import React from 'react';
import { useParams } from 'react-router-dom';
import { Car } from '../../types/types';
import carData from '../../assets/data/carData';
import BookingForm from '../booking/BookingForm';

const VehicleDetails: React.FC = () => {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const vehicle: Car | undefined = carData.find(car => car.id === parseInt(vehicleId || ''));

  if (!vehicle) {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Vehicle not found</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-4 text-center">{vehicle.brand} {vehicle.carName} Details</h2>
        <img 
          src={vehicle.imgUrl} 
          alt={`${vehicle.brand} ${vehicle.carName}`} 
          className="w-full max-w-md h-auto object-contain rounded-lg mb-4 mx-auto" 
        />
        <p className="text-lg mb-2">{vehicle.description}</p>
        <p className="text-lg mb-2"><span className="font-bold">Model:</span> {vehicle.model}</p>
        <p className="text-lg mb-4"><span className="font-bold">Price:</span> ${vehicle.price} per day</p>
      </div>
      <div className="flex-1">
        <BookingForm vehicle={vehicle} />
      </div>
    </div>
  );
};

export default VehicleDetails;
