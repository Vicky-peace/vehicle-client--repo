// src/store.ts
import { configureStore, combineReducers, Reducer } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { api } from '../sevices/rtk-api/auth';
import authReducer from '../sevices/slices/authSlice';
import { vehiclesApi } from "../sevices/rtk-api/vehicleApi";
import { usersApi } from '../sevices/rtk-api/userApi';
import { bookingsApi } from "../sevices/rtk-api/bookingApi";
import { locationApi } from "../sevices/rtk-api/locationApi";
import { fleetApi } from "../sevices/rtk-api/fleetApi";
import { paymentsApi } from "../sevices/rtk-api/paymentsApi";
import { ticketsApi } from "../sevices/rtk-api/ticketsApi";

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer: Reducer = combineReducers({
    auth: authReducer,
    [api.reducerPath]: api.reducer,
    [vehiclesApi.reducerPath]: vehiclesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [bookingsApi.reducerPath]: bookingsApi.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
    [fleetApi.reducerPath]: fleetApi.reducer,
    [paymentsApi.reducerPath]: paymentsApi.reducer,
    [ticketsApi.reducerPath]: ticketsApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(
            api.middleware,
            vehiclesApi.middleware,
            usersApi.middleware,
            bookingsApi.middleware,
            locationApi.middleware,
            fleetApi.middleware,
            paymentsApi.middleware,
            ticketsApi.middleware
        ),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
