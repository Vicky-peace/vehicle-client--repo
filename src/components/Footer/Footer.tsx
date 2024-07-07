import './footer.scss';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="main_container">
      <footer className="footer_container">
        <div className="first_container">
          <h1>CarHaven.io</h1>
          <p>CarHaven.io is a car rental service that allows you to book a car from anywhere in the world.</p>
    
        </div>
        <div className="second_container">
          <h1 className='text-center'>Quick Links</h1>
          <ul className='text-center'>
           <Link to='/'><li>Home</li></Link>
           <Link to='/about'><li>About</li></Link> 
           <Link to='/cars'> <li>Cars</li></Link>   
           <Link to='/contact'> <li>Contact</li></Link>    
          </ul>
        </div>
        <div className="third_container">
          <h1>Head Office</h1>
          <ul>
            <li>123 Nairobi</li>
            <li>Phone: +254 45768678</li>
          </ul>
        </div>
        <div className="fourth_container">
          <h1>Newsletter</h1>
          <p>Subscribe to our newsletter to receive the latest news and exclusive offers every week.</p>
          <form>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </footer>
      <div className="footer_bottom text-center">
        <p>© 2024 Car Rental. All Rights Reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
