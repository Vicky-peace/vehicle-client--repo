import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import './contact.scss'; 
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
    <>
    <div className="contact-form-section">
        <img src={ContactImg} alt="Contact Us" className="contact-img"/>
        <h2>Contact</h2>

    <div className="contact-container">
      
        <form>
          <h3>Get In Touch</h3>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Email" required />
          <textarea placeholder="Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
      <div className="contact-info-section">
        <h3>Contact Information</h3>
        <p>123 Elburgon, Nakuru, Kenya</p>
        <p>Phone: +88683896366</p>
        <p>Email: example@gmail.com</p>
        <h3>Follow Us</h3>
        <div className="social-icons">
          {socialLinks.map((link, index) => (
            <Link to={link.url} key={index}>
              {link.icon}
            </Link>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Contact;
