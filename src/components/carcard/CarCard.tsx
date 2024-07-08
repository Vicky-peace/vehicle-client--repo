import React from 'react';
import { Link } from 'react-router-dom';
import './carcard.scss';

interface CarCardProps {
  id: number;
  image: string;
  carName: string;
  price: number;
  model: string;
}

const CarCard: React.FC<CarCardProps> = ({ id, image, carName, price, model }) => {
  return (
    <div className="car-card bg-white shadow-lg rounded-lg p-4">
      <img src={image} alt={carName} className="car-image w-full h-48 object-cover rounded" />
      <h3 className="text-xl font-bold mt-2">{carName}</h3>
      <p className="price text-lg text-gray-700">{price} / Day</p>
      <div className="features mt-2 text-gray-600">
        <span>{model}</span>
      </div>
      <div className="actions mt-4 flex justify-between">
        <Link to={`/booking/${id}`} className="rent-btn bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Rent
        </Link>
        <Link to={`/vehicle-details/${id}`} className="details-btn bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
          Details
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
