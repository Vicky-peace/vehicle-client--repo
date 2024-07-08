import {Outlet} from 'react-router-dom';
import Sidenav from '../../../components/sidebar/Sidebar';


const UserDashboard = () => {
    return (
        <div className="flex">
            <Sidenav/>
            <main className="flex-grow p-4 md:ml-1/5 lg:ml-1/6">
                <Outlet />
            </main>
        </div>
    );
};  

export default UserDashboard;