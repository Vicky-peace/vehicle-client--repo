import { useState } from 'react';
import { CarCardProps } from '../../types/types';
import CarCard from '../../components/carcard/CarCard';
import { vehiclesApi } from '../../sevices/rtk-api/vehicleApi';
import { ClipLoader } from 'react-spinners';

const VehicleList = () => {
  const { data: vehicles, error, isLoading } = vehiclesApi.useGetVehiclesQuery();
  console.log(vehicles);

  const [manufacturer, setManufacturer] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number | string>('');
  const [maxPrice] = useState<number | string>('');

  const handleManufacturerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setManufacturer(event.target.value);
  };

  const handleModelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setModel(event.target.value);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(event.target.value);
  };


  const filterVehicles = (vehicles: CarCardProps[]) => {
    return vehicles.filter(vehicle => {
      const matchesManufacturer = manufacturer ? vehicle.vehicleSpec.manufacturer.toLowerCase().includes(manufacturer.toLowerCase()) : true;
      const matchesModel = model ? vehicle.vehicleSpec.model.toLowerCase().includes(model.toLowerCase()) : true;
      const matchesMinPrice = minPrice ? vehicle.rental_rate >= Number(minPrice) : true;
      const matchesMaxPrice = maxPrice ? vehicle.rental_rate <= Number(maxPrice) : true;

      return matchesManufacturer && matchesModel && matchesMinPrice && matchesMaxPrice;
    });
  };

  const filteredVehicles = vehicles ? filterVehicles(vehicles) : [];

  if (isLoading) return <div className="flex justify-center items-center h-screen"><ClipLoader color="#f00" size={150} /></div>;
  if (error) return <div>Error: Error Fetching</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="mb-4 md:mb-0">
            <label htmlFor="manufacturer" className="block text-lg font-medium mb-2">Manufacturer:</label>
            <select
              id="manufacturer"
              value={manufacturer}
              onChange={handleManufacturerChange}
              className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="Toyota">Toyota</option>
              <option value="Honda">Honda</option>
              <option value="BMW">BMW</option>
              <option value="Mercedes">Mercedes</option>
              <option value="Audi">Audi</option>
              <option value="Volkswagen">Volkswagen</option>
              <option value="Ford">Ford</option>
              <option value="Chevrolet">Chevrolet</option>
              <option value="Nissan">Nissan</option>
              <option value="Hyundai">Hyundai</option>
              <option value="Subaru">Subaru</option>
            </select>
          </div>
          <div className="mb-4 md:mb-0">
            <label htmlFor="model" className="block text-lg font-medium mb-2">Model:</label>
            <input
              type="text"
              id="model"
              value={model}
              onChange={handleModelChange}
              className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 md:mb-0">
            <label htmlFor="minPrice" className="block text-lg font-medium mb-2">Min Price:</label>
            <input
              type="number"
              id="minPrice"
              value={minPrice}
              onChange={handleMinPriceChange}
              className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
         
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((car: CarCardProps) => (
          <CarCard
            key={car.vehicle_id}
            vehicle_id={car.vehicle_id}
            vehicle_image={car.vehicle_image}
            rental_rate={car.rental_rate}
            availability={car.availability}
            vehicleSpec={car.vehicleSpec}
          />
        ))}
      </div>
    </div>
  );
};

export default VehicleList;
