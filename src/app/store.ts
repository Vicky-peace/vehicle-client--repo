import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { api } from '../sevices/rtk-api/auth';
import authReducer from '../sevices/slices/authSlice';
import { vehiclesApi } from "../sevices/rtk-api/vehicleApi";
import vehiclesReducer from "../sevices/slices/vehiclesSlice";
import {usersApi} from '../sevices/rtk-api/userApi';

const persistConfig = {
    key: 'root',
    storage,
};

// Combine reducers
const rootReducer = combineReducers({
    auth: authReducer,
    [api.reducerPath]: api.reducer,
    vehicles: vehiclesReducer,
    [vehiclesApi.reducerPath]: vehiclesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
});

// Persist combined reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Define the RootState type
export type RootState = ReturnType<typeof rootReducer>;

// Configure store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(api.middleware, vehiclesApi.middleware).concat(usersApi.middleware),
});

// Create persistor
export const persistor = persistStore(store);

// Setup listeners for RTK-Query
setupListeners(store.dispatch);
