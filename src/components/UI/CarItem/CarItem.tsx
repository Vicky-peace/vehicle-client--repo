import React from 'react';
import CarCard from '../../carcard/CarCard';
import { Car } from "../../../types/types";
import { vehiclesApi } from "../../../sevices/rtk-api/vehicleApi";
import './caritem.scss';

const CarItem: React.FC = () => {
  const { data: vehicles, error, isLoading } = vehiclesApi.useGetVehiclesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: Error Fetching</div>;

  return (
    <div className="main">
      <h2 className="text-center text-xl md:text-3xl">Featured Vehicles</h2>
      <div className='car-cards-item'>
        {vehicles?.slice(0, 6).map((car: Car) => (
          <CarCard
            key={car.vehicle_id}
            vehicle_id={car.vehicle_id}
            vehicle_image={car.vehicle_image}
            manufacturer={car.manufacturer}
            rental_rate={car.rental_rate}
            model={car.model}
            availability={car.availability}
            transmission={car.transmission}
            features={car.features}
            year={car.year}
            seating_capacity={car.seating_capacity}
            color={car.color}
            fuel_type={car.fuel_type}
          />
        ))}
      </div>
    </div>
  );
}

export default CarItem;
