export type CarSpecification = {
  vehicle_id: number;
  manufacturer: string;
  model: string;
  year: number;
  fuel_type: string;
  vehicle_image: string;
  engine_capacity?: string | null;
  transmission?: string | null;
  seating_capacity?: number | null;
  color?: string | null;
  features?: string | null;
  created_at: string;
  updated_at: string;
};

export type Car = {
  vehicleSpec_id: number;
  rental_rate: number;
  availability: boolean;
} & CarSpecification;


export type Booking = {
  booking_id: number;
  user_id: number;
  vehicle_id: number;
  location_id: number;
  booking_date: string; 
  return_date: string;  
  total_amount: string; 
  booking_status: 'Completed' | 'Pending' | 'Cancelled';
  created_at: string; 
  updated_at: string; 
};
