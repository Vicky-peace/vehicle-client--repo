import carData from "../../../assets/data/carData"
import CarCard from '../../carcard/CarCard'
import { Car } from "../../../types/types"
import './caritem.scss';
const CarItem = () => {
  return (
  <div className="main"> 
  <h2 className="text-center text-xl md:text-3xl">Featured Vehicles</h2>
  <div className='car-cards-item'>
       
       {
         carData.slice(0,6).map((car: Car) =>(
             <CarCard
           key={car.id}
           image={car.imgUrl}
           carName={car.carName}
           price={car.price}
           model={car.model}
         />
         ))
       }
     </div>
  
  </div>
   
  )
}

export default CarItem