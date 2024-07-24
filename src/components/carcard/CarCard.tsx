import React from 'react';
import { Link } from 'react-router-dom';
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
  vehicle_image,
  rental_rate,
  availability,
  vehicleSpec,
}) => {

  const { manufacturer, model, year } = vehicleSpec;

  return (
    <div className="car-card bg-white shadow-lg rounded-lg p-4">
     <img src={vehicle_image} alt={`${manufacturer} ${model}`} className="car-image w-full h-48 object-cover rounded" />
      <h3 className="text-xl font-bold mt-2">{manufacturer} {model} ({year})</h3>
      <p className="price text-lg text-gray-700">{rental_rate} / Day</p>
      <p className={`availability text-lg ${availability ? 'text-green-600' : 'text-red-600'}`}>{availability ? 'Available' : 'Not Available'}</p>
      <div className="details mt-2 text-gray-600">
      </div>
      <div className="actions mt-4 flex justify-between">
        <Link 
          to={`/booking/${vehicle_id}`} 
          className="rent-btn text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300" 
          style={{ backgroundColor: '#2769F5' }}
        >
          Rent
        </Link>
        <Link 
          to={`/vehicle-details/${vehicle_id}`} 
          className="details-btn text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300" 
          style={{ backgroundColor: '#4798F5' }}
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
