
import { CarCardProps } from '../../types/types';
import CarCard from '../../components/carcard/CarCard';
import { vehiclesApi } from '../../sevices/rtk-api/vehicleApi';
import { ClipLoader } from 'react-spinners';

const VehicleList =  () => {
  const {data: vehicles, error, isLoading} = vehiclesApi.useGetVehiclesQuery();
  console.log(vehicles);
  
  if(isLoading) return <div className="flex justify-center items-center h-screen"><ClipLoader color="#f00" size={150} /></div>;
  if(error) return <div>Error: Error Fetching</div>;

  return(
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vehicles?.map((car: CarCardProps) => (
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