import React, { useState, useEffect } from 'react';
import { Car } from '../../types/types';
import carData from '../../assets/data/carData';
import CarCard from '../../components/carcard/CarCard';

const VehicleList: React.FC = () => {
  const [vehicles, setVehicles] = useState<Car[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Car[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [date, setDate] = useState<string>('');
  const [duration, setDuration] = useState<number>(1);

  useEffect(() => {
    setVehicles(carData);
    setFilteredVehicles(carData);
  }, []);

  const handleCategoryFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setCategoryFilter(category);
    filterVehicles(category, date, duration);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    setDate(selectedDate);
    filterVehicles(categoryFilter, selectedDate, duration);
  };

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDuration = parseInt(event.target.value);
    setDuration(selectedDuration);
    filterVehicles(categoryFilter, date, selectedDuration);
  };

  const filterVehicles = (category: string, date: string, duration: number) => {
    let filtered = vehicles;

    if (category !== 'all') {
      filtered = filtered.filter(vehicle => vehicle.brand.toLowerCase() === category.toLowerCase());
    }

    // Add more filtering logic for date and duration if necessary

    setFilteredVehicles(filtered);
  };

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
            <option value="BMW">BMW</option>
            {/* Add more options based on available brands */}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-lg font-medium mb-2">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={handleDateChange}
            className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="duration" className="block text-lg font-medium mb-2">Duration (days):</label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={handleDurationChange}
            className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredVehicles.map(vehicle => (
          <CarCard
            key={vehicle.id}
            id={vehicle.id}
            image={vehicle.imgUrl}
            carName={vehicle.carName}
            price={vehicle.price}
            model={vehicle.model}
          />
        ))}
      </div>
    </div>
  );
};

export default VehicleList;
