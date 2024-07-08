export interface Car {
    id: number;
    brand: string;
    rating: number;
    carName: string;
    imgUrl: string;
    model: string;
    price: number;
    speed: string;
    gps: string;
    seatType: string;
    automatic: string;
    description: string;
    name?: string; // Optional
    mileage?: string; // Optional
    transmission?: string; // Optional
  }
  
  // Define CarSpecification type based on VehicleSpecifications table
// export type CarSpecification = {
//   vehicle_id: number;
//   manufacturer: string;
//   model: string;
//   year: number;
//   fuel_type: string;
//   engine_capacity?: string | null;
//   transmission?: string | null;
//   seating_capacity?: number | null;
//   color?: string | null;
//   features?: string | null;
//   created_at: string; // Assuming timestamp is a string representation
//   updated_at: string; // Assuming timestamp is a string representation
// };

// // Define Car type based on Vehicles table
// export type Car = {
//   vehicleSpec_id: number;
//   vehicle_id: number;
//   rental_rate: number;
//   availability: boolean;
//   created_at: string; // Assuming timestamp is a string representation
//   updated_at: string; // Assuming timestamp is a string representation
// } & CarSpecification; // Extend with CarSpecification to include all fields
