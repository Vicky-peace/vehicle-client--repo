export interface VehicleSpec {
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

export interface CarCardProps {
  vehicle_id: number;
  vehicle_image: string;
  rental_rate: number;
  availability: boolean;
  vehicleSpec: VehicleSpec;
}





export type Location ={
  location_id: number;
  name: string;
  address: string;
  contact_phone: string;
  created_at: string;
  updated_at: string;
}

export type Booking = {
  booking_id: number;
  user_id: number;
  vehicle_id: number;
  location_id: number;
  booking_date: string; 
  return_date: string;  
  total_amount: number; 
  booking_status: 'Completed' | 'Pending' | 'Cancelled';
  created_at: string; 
  updated_at: string;
  vehicle: CarCardProps;
  location: Location; 
};
export interface Users {
  user_id: number;
  full_name: string;
  email: string;
  contact_phone: string;
  address: string;
  role: string;
  profile_image: string;
}

export interface Fleet{
 fleet_id: number;  
 vehicle_id: number;
 acquisition_date: string;
 depreciation_rate: number;
 current_value: number;
 maintenance_cost: number;
 status: 'Active' | 'Inactive';
}