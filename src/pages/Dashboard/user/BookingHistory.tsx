import { bookingsApi } from "../../../sevices/rtk-api/bookingApi";
import { Booking } from "../../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { ClipLoader } from "react-spinners";

const BookingHistory = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user ? user.user_id: null;
  // Log userId to verify it's correct
  console.log("UserID:", userId);
 
 const { data: bookings, error, isLoading } = bookingsApi.useGetBookingQuery(userId) as { data: Booking[] | undefined, error: any, isLoading: boolean };
console.log('Bookings:', bookings);
   if (isLoading) return <div className="flex justify-center items-center h-screen"><ClipLoader color="#f00" size={150} /></div>;
  if (error) return <div>Error: Failed to fetch booking history</div>;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold mb-4">Booking History</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Booking ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vehicle Manufacturer
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Booking Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Return Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Amount
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookings?.map((booking: Booking) => (
            <tr key={booking.booking_id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{booking.booking_id}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{booking.vehicle.vehicleSpec.manufacturer}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{booking.location.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{new Date(booking.booking_date).toLocaleString()}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{new Date(booking.return_date).toLocaleString()}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">${booking.total_amount}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${booking.booking_status === 'Completed' ? 'bg-green-100 text-green-800' : booking.booking_status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {booking.booking_status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
};

export default BookingHistory;