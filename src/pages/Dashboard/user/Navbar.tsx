import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#0A0A3E] p-4 text-white fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">CarHaven.io</Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="flex items-center space-x-1 hover:text-gray-300">
              <Home size={20} />
              <span>Home</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
