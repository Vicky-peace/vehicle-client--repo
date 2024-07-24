import { useState } from 'react';
import { AlignJustify, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../sevices/slices/authSlice';
import { RootState } from '../../app/store';
import Image1 from '../../assets/all-images/ava-1.jpg';
import "./navbar.css"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state: RootState) => state.auth);
    const user = useSelector((state: RootState) => state.auth.user);
console.log(auth)
    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <nav className="navbar bg-[#0A0A3E] p-4 md:px-8 text-white">
            <div className="flex justify-between items-center w-full">
                <div className="flex-1">
                    <Link to="/" className="text-3xl cursor-pointer">
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
                                <span className="text-2xl">Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/cars" className="hover:text-orange-500">
                                <span className="text-2xl">Cars</span>
                            </Link>
                        </li>
                        {auth.user && (
                            <li>
                                <Link to={auth.user.role === 'admin' ? '/admin' : '/dashboard'} className="hover:text-orange-500">
                                    <span className="text-2xl">Dashboard</span>
                                </Link>
                            </li>
                        )}
                        <li>
                            <Link to="/contact" className="hover:text-orange-500">
                                <span className="text-2xl">Contact</span>
                            </Link>
                        </li>
                    </ul>
                    <div className="flex gap-4 items-center relative">
                        {auth.user ? (
                            <>
                                <div onClick={toggleDropdown} className="cursor-pointer">
                                    <img
                                        src={user?.profile_image || Image1}
                                        alt="Profile"
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                </div>
                                {dropdownOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
                                        <div className="flex items-center p-4">
                                            <img
                                                src={user?.profile_image || Image1}
                                                alt="Profile"
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                            <div className="ml-4">
                                                <p className="text-lg font-semibold">{user.full_name}</p>
                                                <p className="text-sm text-gray-500">{user.role}</p>
                                            </div>
                                        </div>
                                        <hr className="my-2" />
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center w-full px-4 py-2 hover:bg-gray-200"
                                        >
                                            <LogOut size={24} className="mr-2" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/auth"
                                    className="border border-orange-500 bg-transparent text-white px-4 py-2 rounded-full hover:bg-orange-500"
                                >
                                    <span className="text-lg">Login</span>
                                </Link>
                                <Link
                                    to="/auth"
                                    className="border border-orange-500 bg-transparent text-white px-4 py-2 rounded-full hover:bg-orange-500"
                                >
                                    <span className="text-lg">Sign up</span>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {/* Responsive Menu */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
                    isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                } md:hidden`}
                onClick={toggleMenu}
            />
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-[#0A0A3E] p-4 transition-transform duration-300 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } md:hidden`}
            >
                
                <ul className="flex flex-col gap-4 w-full text-white">
                    <li>
                        <Link to="/" className="w-full hover:text-orange-500" onClick={toggleMenu}>
                            <span className="text-2xl">Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/cars" className="w-full hover:text-orange-500" onClick={toggleMenu}>
                            <span className="text-2xl">Cars</span>
                        </Link>
                    </li>
                    {auth.user && (
                        <li>
                            <Link to={auth.user.role === 'admin' ? '/admin' : '/dashboard'} className="w-full hover:text-orange-500" onClick={toggleMenu}>
                                <span className="text-2xl">Dashboard</span>
                            </Link>
                        </li>
                    )}
                    <li>
                        <Link to="/contact" className="w-full hover:text-orange-500" onClick={toggleMenu}>
                            <span className="text-2xl">Contact</span>
                        </Link>
                    </li>
                </ul>
                <div className="flex flex-col gap-4 w-full mt-4">
                    {auth.user ? (
                        <>
                            <img
                                src={user.profile_image||Image1}
                                alt="Profile"
                                className="w-10 h-10 rounded-full object-cover self-center"
                            />
                            <button
                                onClick={handleLogout}
                                className="border border-orange-500 bg-transparent text-white px-4 py-2 rounded-full w-full text-center hover:bg-orange-500"
                            >
                                <span className="text-lg"><LogOut size={24} /></span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/auth"
                                className="border border-orange-500 bg-transparent text-white px-4 py-2 rounded-full w-full text-center hover:bg-orange-500"
                                onClick={toggleMenu}
                            >
                                <span className="text-lg">Login</span>
                            </Link>
                            <Link
                                to="/auth"
                                className="border border-orange-500 bg-transparent text-white px-4 py-2 rounded-full w-full text-center hover:bg-orange-500"
                                onClick={toggleMenu}
                            >
                                <span className="text-lg">Sign up</span>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
