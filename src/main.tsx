import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from './app/store.ts';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home.tsx';
import NotFound from './pages/NotFound/NotFound.tsx';
import AboutSection from './components/UI/About/AboutSection.tsx';
import Contact from './pages/Contact/Contact.tsx';
import Layout from './components/Layout/Layout.tsx';
import AuthPage from './components/auth/Auth.tsx';
import UserDashboard  from './pages/Dashboard/user/userDashboard.tsx';
import DashboardOverview from './pages/Dashboard/user/DashboardOverview.tsx';
import BookingHistory from './pages/Dashboard/user/BookingHistory.tsx';
import CurrentBookings from './pages/Dashboard/user/CurrentBookings.tsx';
import AccountSettings from './pages/Dashboard/user/AccountSettings.tsx';




const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><Home/></Layout>,
    errorElement: <NotFound/>,
    children: [
      {
        path: 'about',
        element: <Layout><AboutSection/></Layout>,
      },
    ]
  },
  {
    path: '/contact',
    element: <Layout><Contact/></Layout>,
    errorElement: <NotFound/>,
  },
 {
  path: '/auth',
  element: <AuthPage/>,
  errorElement: <NotFound/>,
 },
 {
  path: '/dashboard',
  element: <UserDashboard/>,
  errorElement: <NotFound/>,
  children: [
    { path: '', element: <DashboardOverview /> },
    { path: 'booking-history', element: <BookingHistory /> },
    { path: 'current-bookings', element: <CurrentBookings /> },
    { path: 'account-settings', element: <AccountSettings /> },
  ],
 }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
   <RouterProvider router = {router}/>
   <ToastContainer/>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
