import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { CarCardProps, Location } from '../../types/types';
import { bookingsApi } from '../../sevices/rtk-api/bookingApi';
import { locationApi } from '../../sevices/rtk-api/locationApi';
import { paymentsApi } from '../../sevices/rtk-api/paymentsApi';
import { ClipLoader } from 'react-spinners';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PYPMUCK9kKR9hSDJ8Pm3qK9Qp5XiDJcbC1ovskxIG6bQSpLW5LlqjLBgJgjcjriAimvA6VjZNNyIHar7RpllrQL00ybqKDmfk');

interface BookingFormProps {
  vehicle: CarCardProps;
}



const BookingForm: React.FC<BookingFormProps> = ({ vehicle }) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [locationId, setLocationId] = useState<number | undefined>(undefined);

  const user = useSelector((state: RootState) => state.auth.user);

  const { data: locations} = locationApi.useGetLocationsQuery();
  const [addBooking, { isLoading: isLoadingBooking }] = bookingsApi.useAddBookingMutation();
  const [createPayment] = paymentsApi.useAddPaymentMutation();
  const [updateStatus] = bookingsApi.useUpdateBookingStatusMutation();
  const [isPaymentLoading, setIsPaymentLoading] = useState<number | null>(null);

  const handleBooking = async () => {
    if (!startDate || !endDate || !locationId || !user || !vehicle) {
      toast.error('Please fill in all fields.');
      return;
    }

    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const rentalDays = end.diff(start, 'day');

    if (rentalDays <= 0) {
      toast.error('End date must be after start date');
      return;
    }

    const totalAmount = rentalDays * vehicle.rental_rate;

    const bookingData = {
      user_id: user.user_id,
      vehicle_id: vehicle.vehicle_id,
      location_id: locationId,
      booking_date: startDate,
      return_date: endDate,
      total_amount: totalAmount,
    };
   
    console.log("Booking Data:", bookingData);

    try {
      const newBooking = await addBooking(bookingData).unwrap();
      toast.success('Booking created successfully');
      
      // Initiate payment
      handleMakePayment(newBooking.booking_id, totalAmount);
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('Error creating booking');
    }
  };

  const handleMakePayment = async (bookingId: number, amount: number) => {
    setIsPaymentLoading(bookingId);
    try {
      const res = await createPayment({ booking_id: bookingId, total_amount: amount }).unwrap();
      toast.success('Payment initiated successfully');
      console.log('Payment response:', res);
      if (res.url) {
        window.location.href = res.url;  // Redirect to the Stripe checkout URL
      } else {
        const stripe = await stripePromise;
        if (stripe && res.transaction_id) {
          const { error } = await stripe.redirectToCheckout({ sessionId: res.transaction_id });
          if (error) {
            console.error('Error redirecting to checkout:', error);
            toast.error('Error redirecting to checkout');
          }else{
            //update booking status
            await updateStatus({id: bookingId, status: 'Completed'}).unwrap(); 
          }
        }
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      toast.error('Error initiating payment');

      await updateStatus({id: bookingId, status: 'Cancelled'}).unwrap();
    } finally {
      setIsPaymentLoading(null);
    }
  };

  return (
    <>
     
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Book Vehicle</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
          <select
            value={locationId}
            onChange={(e) => setLocationId(Number(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a location</option>
            {locations?.map((location: Location) => (
              <option key={location.location_id} value={location.location_id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Vehicle</label>
          <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            {vehicle.vehicleSpec.manufacturer} {vehicle.vehicleSpec.model}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Rental Rate</label>
          <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            ${vehicle.rental_rate} per day
          </div>
        </div>
        <button
          onClick={handleBooking}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={isLoadingBooking || isPaymentLoading !== null}
        >
          {isLoadingBooking || isPaymentLoading !== null ? (
            <div className='flex items-center'>
              <ClipLoader size={24} color="white" />
              <span> Processing...</span>
            </div>
          ) : (
            "Book Now"
          )}
        </button>
      </div>
    </>
  );
};

export default BookingForm;
