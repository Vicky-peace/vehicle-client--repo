import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../assets/all-images/cars-img/bmw-offer.png'
import './carcard.scss';

interface VehicleSpec {
  manufacturer: string;
  model: string;
  year: number;
  fuel_type: string;
  engine_capacity: string;
  transmission: string;
  seating_capacity: number;
  color: string;
  features: string;
} 
interface CarCardProps {
  vehicle_id: number;
  vehicle_image: string;
  rental_rate: number;
  availability: boolean;
  vehicleSpec: VehicleSpec;
}



const CarCard: React.FC<CarCardProps> = ({
  vehicle_id,
  rental_rate,
  availability,
  vehicleSpec
}) => {
  const {
    manufacturer,
    model,
    year,
    fuel_type,
    engine_capacity,
    transmission,
    seating_capacity,
    color,
    features
  } = vehicleSpec;

  return (
    <div className="car-card bg-white shadow-lg rounded-lg p-4">
      <img src={Image} alt={manufacturer} className="car-image w-full h-48 object-cover rounded" />
      <h3 className="text-xl font-bold mt-2">{manufacturer} {model} ({year})</h3>
      <p className="price text-lg text-gray-700">{rental_rate} / Day</p>
      <p className="availability text-lg text-green-600">{availability ? 'Available' : 'Not Available'}</p>
      <div className="details mt-2 text-gray-600">
        <p>Transmission: {transmission || 'N/A'}</p>
        <p>Fuel Type: {fuel_type}</p>
        <p>Engine Capacity: {engine_capacity}</p>
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
