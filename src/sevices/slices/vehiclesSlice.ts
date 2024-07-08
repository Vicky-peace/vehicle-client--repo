import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Vehicle {
    id: number;
    manufacturer: string;
    model: string;
    year: number;
  }

  interface VehiclesState {
    vehicles: Vehicle[];
    loading: boolean;
    error: string | null;
  }

  const initialState: VehiclesState = {
    vehicles: [],
    loading: false,
    error: null,
  };

const vehiclesSlice = createSlice({
    name: 'vehicles',
    initialState,
    reducers: {
      fetchVehiclesStart(state) {
        state.loading = true;
        state.error = null;
      },
      fetchVehiclesSuccess(state, action: PayloadAction<Vehicle[]>) {
        state.loading = false;
        state.vehicles = action.payload;
      },
      fetchVehiclesFailure(state, action: PayloadAction<string>) {
        state.loading = false;
        state.error = action.payload;
      },
      addVehicle(state, action: PayloadAction<Vehicle>) {
        state.vehicles.push(action.payload);
      },
      deleteVehicle(state, action: PayloadAction<number>) {
        state.vehicles = state.vehicles.filter((vehicle) => vehicle.id !== action.payload);
      },
    },
  });
  
  export const {
    fetchVehiclesStart,
    fetchVehiclesSuccess,
    fetchVehiclesFailure,
    addVehicle,
    deleteVehicle,
  } = vehiclesSlice.actions;
  
  export default vehiclesSlice.reducer
  export type {VehiclesState}