import './hero.scss'
import { Link } from 'react-router-dom';

const Hero = () => {

  return (
    <div className='hero__section'>
      <div className="hero-text">
        <h1 className='hero-h1'>CarHaven.io</h1>
        <p className='hero-para '>Book Now and Get 50% off</p>
        <Link to='/cars'><button className='hero-btn'>Book Now</button></Link>
      </div>
    </div>
  )
}

export default Hero