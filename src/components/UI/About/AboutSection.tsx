import aboutImg from '../../../assets/all-images/cars-img/bmw-offer.png';
import { CheckCircle } from 'lucide-react';

const AboutSection = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row items-center lg:space-x-8">
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <div className="max-w-lg mx-auto lg:mx-0">
            <h4 className="text-2xl font-semibold text-gray-700 mb-4">About Us</h4>
            <h2 className="text-4xl font-bold mb-6">Welcome to CarHaven.io</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              At CarHaven.io, we strive to provide the best vehicle rental experience. Whether you need a car for a business trip, a family vacation, or a quick weekend getaway, we have a wide range of vehicles to suit your needs. Our platform is user-friendly, allowing you to easily book a car with just a few clicks. We offer competitive pricing, exceptional customer service, and a seamless booking process. Experience the convenience and reliability of CarHaven.io for your next journey.
            </p>
            <div>
              <p className="text-lg text-gray-700 flex items-center mb-4">
                <CheckCircle className="mr-2 text-primary" /> Wide selection of vehicles.
              </p>
              <p className="text-lg text-gray-700 flex items-center">
                <CheckCircle className="mr-2 text-primary" /> Competitive pricing and special offers.
              </p>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="max-w-lg mx-auto lg:mx-0">
            <img src={aboutImg} alt="About Us" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
