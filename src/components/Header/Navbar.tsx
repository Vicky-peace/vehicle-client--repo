import { useState, useEffect } from 'react';
import { AlignJustify } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { usersApi } from '../../sevices/rtk-api/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../sevices/slices/authSlice';
import { RootState } from '../../app/store'; // Adjust the import path as needed

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: users, isLoading } = usersApi.useGetUsersQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  useEffect(() => {
    if (!auth.user) {
      navigate('/');
    }
  }, [auth.user, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const user = users && users.length > 0 ? users[0] : null;

  return (
    <nav className="navbar bg-[#0A0A3E] p-4 md:px-8 text-white">
      <div className="flex justify-between items-center w-full">
        <div className="flex-1">
          <Link to="/" className="text-xl cursor-pointer">
            CarHaven.io
          </Link>
        </div>
        <button className="menu-icon md:hidden text-white" onClick={toggleMenu}>
          <AlignJustify size={24} />
        </button>
        <div className="hidden md:flex items-center gap-20">
          <ul className="flex gap-16 list-none text-lg">
            <li>
              <Link to="/" className="hover:text-orange-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-orange-500">
                About
              </Link>
            </li>
            <li>
              <Link to="/cars" className="hover:text-orange-500">
                Cars
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-orange-500">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-orange-500">
                Contact
              </Link>
            </li>
          </ul>
          <div className="flex gap-4">
            {auth.user ? (
              <>
                <img
                  src={user?.profile_image} // Adjust based on the actual field in your user data
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <button
                  onClick={handleLogout}
                  className="border border-orange-500 bg-transparent text-white px-4 py-2 rounded-full hover:bg-orange-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="border border-orange-500 bg-transparent text-white px-4 py-2 rounded-full hover:bg-orange-500"
                >
                  Login
                </Link>
                <Link
                  to="/auth"
                  className="border border-orange-500 bg-transparent text-white px-4 py-2 rounded-full hover:bg-orange-500"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Responsive Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 md:hidden bg-[#0A0A3E] p-4">
          <ul className="flex flex-col gap-4 w-full">
            <li>
              <Link to="/" className="w-full hover:text-orange-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="w-full hover:text-orange-500">
                About
              </Link>
            </li>
            <li>
              <Link to="/cars" className="w-full hover:text-orange-500">
                Cars
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="w-full hover:text-orange-500">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/contact" className="w-full hover:text-orange-500">
                Contact
              </Link>
            </li>
          </ul>
          <div className="flex flex-col gap-4 w-full mt-4">
            {auth.user ? (
              <>
                <img
                  src={user?.profile_image} // Adjust based on the actual field in your user data
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover self-center"
                />
                <button
                  onClick={handleLogout}
                  className="border border-orange-500 bg-transparent text-white px-4 py-2 rounded-full w-full text-center hover:bg-orange-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="border border-orange-500 bg-transparent text-white px-4 py-2 rounded-full w-full text-center hover:bg-orange-500"
                >
                  Login
                </Link>
                <Link
                  to="/auth"
                  className="border border-orange-500 bg-transparent text-white px-4 py-2 rounded-full w-full text-center hover:bg-orange-500"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
