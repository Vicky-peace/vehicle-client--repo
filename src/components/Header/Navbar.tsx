import { useState, useEffect } from 'react';
import { AlignJustify } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../sevices/slices/authSlice';
import { RootState } from '../../app/store';
import Image1 from '../../assets/all-images/ava-1.jpg';
import { User, LogOut } from 'lucide-react'; 

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state: RootState) => state.auth);
    const user = useSelector((state: RootState) => state.auth.user);

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
                    <div className="flex gap-4 items-center">
                        {auth.user ? (
                            <>
                                <img
                                    src={user?.profile_image || Image1}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <button
                                    onClick={handleLogout}
                                    className="border border-orange-500 bg-transparent text-white px-4 py-2 rounded-full hover:bg-orange-500"
                                >
                                    <span className="text-lg"><LogOut size={24} /></span>
                                </button>
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
                                    to="/register"
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
            {isOpen && (
                <div className="absolute top-full left-0 right-0 md:hidden bg-[#0A0A3E] p-4">
                    <ul className="flex flex-col gap-4 w-full">
                        <li>
                            <Link to="/" className="w-full hover:text-orange-500">
                                <span className="text-2xl"><User size={24} /></span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="w-full hover:text-orange-500">About</Link>
                        </li>
                        <li>
                            <Link to="/cars" className="w-full hover:text-orange-500">Cars</Link>
                        </li>
                        {auth.user && (
                            <li>
                                <Link to={auth.user.role === 'admin' ? '/admin' : '/dashboard'} className="w-full hover:text-orange-500">
                                    <span className="text-2xl">Dashboard</span>
                                </Link>
                            </li>
                        )}
                        <li>
                            <Link to="/contact" className="w-full hover:text-orange-500">Contact</Link>
                        </li>
                    </ul>
                    <div className="flex flex-col gap-4 w-full mt-4">
                        {auth.user ? (
                            <>
                                <img
                                    src={Image1}
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
                                >
                                    <span className="text-lg">Login</span>
                                </Link>
                                <Link
                                    to="/register"
                                    className="border border-orange-500 bg-transparent text-white px-4 py-2 rounded-full w-full text-center hover:bg-orange-500"
                                >
                                    <span className="text-lg">Sign up</span>
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
