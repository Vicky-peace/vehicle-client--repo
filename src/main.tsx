import React from 'react'
import ReactDOM from 'react-dom/client'
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
 }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
   <RouterProvider router = {router}/>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
