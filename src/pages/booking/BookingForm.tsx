import React, { useState } from 'react';
import { Car } from '../../types/types';

interface BookingFormProps {
  vehicle: Car;
}

const BookingForm: React.FC<BookingFormProps> = ({ vehicle }) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleBooking = () => {
    // Handle booking logic here
    alert('Booking successful!');
    // Navigate or update state as needed
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Book {vehicle.brand} {vehicle.carName}</h2>
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
      <button 
        onClick={handleBooking} 
        className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 transition duration-200"
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default BookingForm;
