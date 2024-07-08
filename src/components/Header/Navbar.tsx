import { useState } from 'react';
import { AlignJustify } from "lucide-react";
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual authentication logic

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        // Add your logout logic here
        setIsLoggedIn(false);
    };

    return (
        <nav className="navbar bg-[#0A0A3E] p-4 md:px-8 text-white">
            <div className="flex justify-between items-center w-full">
                <div className="flex-1">
                    <Link to="/" className="text-xl cursor-pointer">CarHaven.io</Link>
                </div>
                <button className="menu-icon md:hidden text-white" onClick={toggleMenu}>
                    <AlignJustify size={24} />
                </button>
                <div className="hidden md:flex items-center gap-20">
                    <ul className="flex gap-16 list-none text-lg">
                        <li><Link to='/' className="hover:text-orange-500">Home</Link></li>
                        <li><Link to='/about' className="hover:text-orange-500">About</Link></li>
                        <li><Link to='/cars' className="hover:text-orange-500">Cars</Link></li>
                        <li><Link to='/dashboard' className="hover:text-orange-500">Dashboard</Link></li>
                        <li><Link to='/contact' className="hover:text-orange-500">Contact</Link></li>
                    </ul>
                    <div className="flex gap-4">
                        {isLoggedIn ? (
                            <button onClick={handleLogout} className="border border-orange-500 bg-transparent text-white px-4 py-2 rounded-full hover:bg-orange-500">Logout</button>
                        ) : (
                            <>
                                <Link to='/auth' className="border border-orange-500 bg-transparent text-white px-4 py-2 rounded-full hover:bg-orange-500">Login</Link>
                                <Link to='/auth' className="border border-orange-500 bg-transparent text-white px-4 py-2 rounded-full hover:bg-orange-500">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {/* Responsive Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 md:hidden bg-[#0A0A3E] p-4">
                    <ul className="flex flex-col gap-4 w-full">
                        <li><Link to='/' className="w-full hover:text-orange-500">Home</Link></li>
                        <li><Link to='/about' className="w-full hover:text-orange-500">About</Link></li>
                        <li><Link to='/cars' className="w-full hover:text-orange-500">Cars</Link></li>
                        <li><Link to='/services' className="w-full hover:text-orange-500">Dashboard</Link></li>
                        <li><Link to='/contact' className="w-full hover:text-orange-500">Contact</Link></li>
                    </ul>
                    <div className="flex flex-col gap-4 w-full mt-4">
                        {isLoggedIn ? (
                            <button onClick={handleLogout} className="border border-orange-500 bg-transparent text-white px-4 py-2 rounded-full w-full text-center hover:bg-orange-500">Logout</button>
                        ) : (
                            <>
                                <Link to='/auth' className="border border-orange-500 bg-transparent text-white px-4 py-2 rounded-full w-full text-center hover:bg-orange-500">Login</Link>
                                <Link to='/auth' className="border border-orange-500 bg-transparent text-white px-4 py-2 rounded-full w-full text-center hover:bg-orange-500">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
