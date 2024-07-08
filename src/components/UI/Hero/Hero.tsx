import { Link } from 'react-router-dom';
import Image1 from '../../../assets/all-images/slider-img/slider-1.jpg'

const Hero = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(" + Image1 + ")",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold text-white tracking-wide">CarHaven.io</h1>
          <p className="mb-5 text-3xl tracking-wide text-white">Book Now and Get 50% off</p>
          <Link to='/cars'>
            <button className="btn btn-primary font-semibold text-1xl">Book Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
