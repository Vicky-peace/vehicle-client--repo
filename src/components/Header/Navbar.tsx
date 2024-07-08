import  { useState } from 'react';
import { AlignJustify } from "lucide-react";
import { Link } from 'react-router-dom';
import "./navbar.scss";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="navbar">
            <div className="navbar__logo">
                <h1>CarHaven.io</h1>
            </div>
            <button className="menu-icon" onClick={toggleMenu}>
                <AlignJustify size={24} color="white" />
            </button>
            <div className={`navbar__menu ${isOpen ? "open" : ""}`}>
                <ul className="nav__links">
                   <Link to='/'> <li>Home</li></Link>
                    <Link to ='/about'><li>About</li></Link>
                    <Link to='/cars'><li>Cars</li></Link>
                    <Link to='/contact'> <li>Contact</li></Link>
                   
                </ul>
                <div className="auths">
                    <Link to='/auth'><button className='login'>Login</button></Link>
                    <Link to='/auth'>
                    <button className='signup'>Sign Up</button></Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
