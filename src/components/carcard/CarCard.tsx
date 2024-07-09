import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../assets/all-images/cars-img/bmw-offer.png'
import './carcard.scss';

export type CarCardProps = {
  vehicle_id: number;
  vehicle_image: string;
  manufacturer: string;
  rental_rate: number;
  model: string;
  availability: boolean;
  transmission?: string | null;
  features?: string | null;
  year: number;
  seating_capacity?: number | null;
  color?: string | null;
  fuel_type: string;
};

const CarCard: React.FC<CarCardProps> = ({
  vehicle_id,
  vehicle_image,
  manufacturer,
  rental_rate,
  model,
  availability,
  transmission,
  features,
  year,
  seating_capacity,
  color,
  fuel_type
}) => {
  return (
    <div className="car-card bg-white shadow-lg rounded-lg p-4">
      <img src={Image} alt={manufacturer} className="car-image w-full h-48 object-cover rounded" />
      <h3 className="text-xl font-bold mt-2">{manufacturer} {model} ({year})</h3>
      <p className="price text-lg text-gray-700">{rental_rate} / Day</p>
      <p className="availability text-lg text-green-600">{availability ? 'Available' : 'Not Available'}</p>
      <div className="details mt-2 text-gray-600">
        <p>Transmission: {transmission || 'N/A'}</p>
        <p>Fuel Type: {fuel_type}</p>
        <p>Seating Capacity: {seating_capacity || 'N/A'}</p>
        <p>Color: {color || 'N/A'}</p>
        <p>Features: {features || 'N/A'}</p>
      </div>
      <div className="actions mt-4 flex justify-between">
        <Link to={`/booking/${vehicle_id}`} className="rent-btn bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Rent
        </Link>
        <Link to={`/vehicle-details/${vehicle_id}`} className="details-btn bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
          Details
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
