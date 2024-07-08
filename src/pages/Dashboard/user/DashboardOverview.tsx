import BookingHistory from './BookingHistory';
import CurrentBookings from './CurrentBookings';
import AccountSettings from './AccountSettings';

const DashboardOverview: React.FC = () => {
    return (
        <div className="space-y-4">
            <BookingHistory />
            <CurrentBookings />
            <AccountSettings />
        </div>
    );
};

export default DashboardOverview;
