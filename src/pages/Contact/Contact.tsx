import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import ContactImg from '../../assets/all-images/drive.jpg';

const socialLinks = [
  {
    url: "#",
    icon: <Facebook size={24} color="#000d6b" />
  },
  {
    url: "#",
    icon: <Instagram size={24} color="#000d6b" />
  },
  {
    url: "#",
    icon: <Linkedin size={24} color="#000d6b" />
  },
  {
    url: "#",
    icon: <Twitter size={24} color="#000d6b" />
  },
];

const Contact = () => {
  return (
    <div className="bg-white">
      <div className="relative w-full h-96">
        <img src={ContactImg} alt="Contact Us" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h2 className="text-3xl font-bold text-white">Contact</h2>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Get In Touch</h3>
            <input type="text" placeholder="Your Name" required className="w-full mb-4 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="email" placeholder="Email" required className="w-full mb-4 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <textarea placeholder="Message" required className="w-full mb-4 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600">Send Message</button>
          </form>

          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
            <p className="mb-2">123 Elburgon, Nakuru, Kenya</p>
            <p className="mb-2">Phone: +88683896366</p>
            <p className="mb-4">Email: example@gmail.com</p>
            <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <Link to={link.url} key={index} className="text-blue-500 hover:text-blue-700">
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
