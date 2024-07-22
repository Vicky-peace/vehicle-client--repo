import React from 'react'
import ProtectedRoute from './components/protectedRoute/ProtectedRoute.tsx';
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
import DashboardOverview from './pages/Dashboard/user/DashboardOverview.tsx';
import BookingHistory from './pages/Dashboard/user/BookingHistory.tsx';
import CurrentBookings from './pages/Dashboard/user/CurrentBookings.tsx';
import AccountSettings from './pages/Dashboard/user/AccountSettings.tsx';

import VehicleDetails from './pages/vehicleDetails/VehicleDetails.tsx';
import VehicleList from './pages/vehicleList/VehicleList.tsx';
import BookingPage from './pages/booking/BookingPage.tsx';

import AdminLogin from './pages/Dashboard/Admin/AdminLogin.tsx';
import AdminLayout from './pages/Dashboard/Admin/AdminLayout.tsx';
import AdminDashboard from './pages/Dashboard/Admin/AdminDashBoard.tsx';
import ManageVehicles from './pages/Dashboard/Admin/ManageVehicles.tsx';
import ManageUsers from './pages/Dashboard/Admin/ManageUsers.tsx';
import ManageLocations from './pages/Dashboard/Admin/ManageLocations.tsx';
import CustomerSupportTickets from './pages/Dashboard/Admin/CustomerSupport.tsx';
import FleetManagement from './pages/Dashboard/Admin/FleetManagement.tsx';
import PaymentSuccess from './PaymentSuccess.tsx';
import PaymentFailed from './PaymentFailed.tsx';
import UserDashboard from './pages/Dashboard/user/userDashboard.tsx';





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
  path: '/payment-successful',
   element: <PaymentSuccess/>
  },
 {
  path: '/payment-failed', 
  element: <PaymentFailed/>
},
 {
  path: '/dashboard',
  element:( 
    <ProtectedRoute>
       <UserDashboard/>
  </ProtectedRoute>
),
  errorElement: <NotFound/>,
  children: [
    { path: '', element: <DashboardOverview /> },
    { path: 'booking-history', element: <BookingHistory /> },
    { path: 'current-bookings', element: <CurrentBookings /> },
    { path: 'account-settings', element: <AccountSettings /> },
  
  ],
 },
 {
  path: '/cars',
  element: <Layout><VehicleList /></Layout>,
  errorElement: <NotFound />,
},
{
  path: '/booking/:id',
  element: ( 
    <ProtectedRoute>
       <Layout><BookingPage /></Layout>
    </ProtectedRoute>
),
  errorElement: <NotFound />,
},
{
  path: '/vehicle-details/:id',
  element: <Layout><VehicleDetails /></Layout>,
  errorElement: <NotFound />,
},
{
  path: '/admin/login',
  element: <AdminLogin />,
  errorElement: <NotFound />,
},
{
  path: '/admin',
  element: (
    <ProtectedRoute requiredRole="admin">
        <AdminLayout />
      </ProtectedRoute>
  ),
  errorElement: <NotFound />,
  children: [
    { path: '', element: <AdminDashboard /> },
    { path: 'manage-vehicles', element: <ManageVehicles /> },
    { path: 'manage-users', element: <ManageUsers /> },
    { path: 'manage-locations', element: <ManageLocations /> },
    { path: 'customer-support-tickets', element: <CustomerSupportTickets /> },
    { path: 'fleet-management', element: <FleetManagement /> },
  ],
},

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
