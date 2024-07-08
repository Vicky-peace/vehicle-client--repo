// BookingPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Car } from '../../types/types';
import carData from '../../assets/data/carData';
import BookingForm from './BookingForm';

const BookingPage: React.FC = () => {
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
    <div className="container mx-auto p-4">
      <BookingForm vehicle={vehicle} />
    </div>
  );
};

export default BookingPage;
