import React, { useState } from "react";
import { bookingsApi } from "../../../sevices/rtk-api/bookingApi";
import { Booking } from "../../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { ClipLoader } from "react-spinners";
import { loadStripe } from "@stripe/stripe-js";
import { paymentsApi } from "../../../sevices/rtk-api/paymentsApi";
import { toast } from "react-toastify";

const stripePromise = loadStripe(
  "pk_test_51PYPMUCK9kKR9hSDJ8Pm3qK9Qp5XiDJcbC1ovskxIG6bQSpLW5LlqjLBgJgjcjriAimvA6VjZNNyIHar7RpllrQL00ybqKDmfk"
);

const CurrentBookings: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user ? user.user_id : null;
  // Fetch current bookings with a status of "Pending"
  const {
    data: bookings,
    error,
    isLoading,
  } = bookingsApi.useGetBookingQuery(userId) as {
    data: Booking[] | undefined;
    error: any;
    isLoading: boolean;
  };

  const [createPayment] = paymentsApi.useAddPaymentMutation();
  const [isPaymentLoading, setIsPaymentLoading] = useState<number | null>(null);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#f00" size={150} />
      </div>
    );
  if (error) return <div>Error: Failed to fetch booking history</div>;

  // Filter bookings with status "Pending"
  const currentBookings = bookings?.filter(
    (booking) => booking.booking_status === "Pending"
  );

  const handleMakePayment = async (bookingId: number, amount: number) => {
    setIsPaymentLoading(bookingId);
    try {
      const res = await createPayment({
        booking_id: bookingId,
        total_amount: amount,
      }).unwrap();
  
      toast.success("Payment initiated successfully");
  
      if (res.url) {
        window.location.href = res.url;  // Redirect to the Stripe checkout URL
      } else {
        const stripe = await stripePromise;
        if (stripe && res.transaction_id) {
          const { error } = await stripe.redirectToCheckout({ sessionId: res.transaction_id });
          if (error) {
            console.error('Error redirecting to checkout:', error);
            toast.error('Error redirecting to checkout');
          }
        }
      }
    } catch (error: any) {
      console.error("Error initiating payment:", error);
      toast.error("Error initiating payment");
    } finally {
      setIsPaymentLoading(null);
    }
  };
  


  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Current Bookings</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Vehicle
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Location
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Booking Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Return Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total Amount
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Payment Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentBookings?.map((booking: Booking) => (
              <tr key={booking.booking_id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {booking.vehicle.vehicleSpec.manufacturer}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {booking.location.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(booking.booking_date).toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(booking.return_date).toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    ${booking.total_amount}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      booking.payments.payment_status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {booking.payments.payment_status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="text-blue-600 hover:text-blue-900"
                    onClick={() =>
                      handleMakePayment(
                        booking.booking_id,
                        booking.total_amount
                      )
                    }
                    disabled={isPaymentLoading === booking.booking_id}
                  >
                    {isPaymentLoading === booking.booking_id ? (
                      <div className="flex items-center">
                        <ClipLoader size={24} color="blue" />
                        <span> Processing...</span>
                      </div>
                    ) : (
                      "Make Payment"
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CurrentBookings;
