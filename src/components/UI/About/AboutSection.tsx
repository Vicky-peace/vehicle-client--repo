import aboutImg from '../../../assets/all-images/cars-img/bmw-offer.png';
import './AboutSection.scss';
const AboutSection = () => {
    return (
     
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="about__section-content">
                <h4 className="section__subtitle">About Us</h4>
                <h2 className="section__title">Welcome to car rent service</h2>
                <p className="section__description">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Voluptatum blanditiis esse accusantium dignissimos labore
                  laborum. Veniam, corporis mollitia temporibus, in quaerat vero
                  deleniti amet dolorem repudiandae, pariatur nam dolore! Impedit
                  neque sit ad temporibus quam similique dolor ipsam praesentium
                  sunt.
                </p>
                <div className="about__section-items">
                  <p className="section__description">
                    <i className="ri-checkbox-circle-line"></i> Lorem ipsum dolor sit amet.
                  </p>
                  <p className="section__description">
                    <i className="ri-checkbox-circle-line"></i> Lorem ipsum dolor sit amet.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="about__img">
                <img src={aboutImg} alt="About Us" className="w-100" />
              </div>
            </div>
          </div>
        </div>
    );
  };
  
  export default AboutSection;