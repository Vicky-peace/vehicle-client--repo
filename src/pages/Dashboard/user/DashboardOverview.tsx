import BookingHistory from './BookingHistory';
import CurrentBookings from './CurrentBookings';
import AccountSettings from './AccountSettings';


const DashboardOverview: React.FC = () => {
    return (
       
        <div className="container mx-auto p-4 space-y-4">
            <BookingHistory />
            <CurrentBookings />
            <AccountSettings />
        </div>
        
    );
};

export default DashboardOverview;
