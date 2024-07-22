import {Outlet} from 'react-router-dom';
import Sidenav from '../../../components/sidebar/Sidebar';


const UserDashboard = () => {
    return (
        <div className="flex flex-col min-h-screen">
        <div className="flex flex-grow pt-16">
            <Sidenav />
            <main className="flex-grow p-4 md:ml-1/5 lg:ml-1/6">
                <Outlet />
            </main>
        </div>
    </div>
    );
};  

export default UserDashboard;