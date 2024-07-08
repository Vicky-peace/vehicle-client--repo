import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {api} from '../sevices/auth';
import authReducer from '../sevices/slices/authSlice';

const persustConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
}

const persistedReducer = persistReducer(persustConfig, authReducer);

export const store = configureStore({
    reducer:{
        [api.reducerPath]: api.reducer,
        auth: persistedReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(api.middleware),
    });

    export const persistor = persistStore(store);
    setupListeners(store.dispatch);
