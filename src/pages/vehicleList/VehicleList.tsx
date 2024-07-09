import React, { useState, useEffect } from 'react';
import { Car } from '../../types/types';
import CarCard from '../../components/carcard/CarCard';
import { vehiclesApi } from '../../sevices/rtk-api/vehicleApi';

const VehicleList: React.FC = () => {
  const { data: vehicles, isLoading, error } = vehiclesApi.useGetVehiclesQuery();
  const [filteredVehicles, setFilteredVehicles] = useState<Car[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    if (vehicles) {
      filterVehicles(categoryFilter);
    }
  }, [vehicles, categoryFilter]);

  const handleCategoryFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setCategoryFilter(category);
  };

  const filterVehicles = (category: string) => {
    if (!vehicles) return;

    let filtered = vehicles;

    if (category !== 'all') {
      filtered = filtered.filter(vehicle => vehicle.manufacturer.toLowerCase() === category.toLowerCase());
    }

    setFilteredVehicles(filtered);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Vehicle List</h2>
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="mb-4">
          <label htmlFor="categoryFilter" className="block text-lg font-medium mb-2">Filter by Category:</label>
          <select
            id="categoryFilter"
            value={categoryFilter}
            onChange={handleCategoryFilterChange}
            className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="Tesla">Tesla</option>
            <option value="Toyota">Toyota</option>
            <option value="BMW">BMW</option>m 
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredVehicles.map(vehicle => (
          <CarCard
            key={vehicle.vehicle_id}
            vehicle_id={vehicle.vehicle_id}
            vehicle_image={vehicle.vehicle_image}
            manufacturer={vehicle.manufacturer}
            model={vehicle.model}
            rental_rate={vehicle.rental_rate}
            availability={vehicle.availability}
            year={vehicle.year}
            fuel_type={vehicle.fuel_type}
          />
        ))}
      </div>
    </div>
  );
};

export default VehicleList;
