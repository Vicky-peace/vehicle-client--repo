import AboutSection from "../../components/UI/About/AboutSection"
import CarItem from "../../components/UI/CarItem/CarItem"
import Hero from "../../components/UI/Hero/Hero"
import Testimonial from "../../components/UI/Testimonial/Testimonial"


const Home = () => {
  return (
    <div className="Home">
       
        {/*Hero */}
        <section className="hero">
        <Hero/>
        <div className="hero_form">
          {/* <FindCard/> */}
        </div>
        </section>

        <section className="about_us">
          <AboutSection/>
        </section>

        <section className="features">
          <CarItem/>
        </section>

        <section className="testimonials">
        <Testimonial />
        </section>

        <section className="footer">
   
        </section>
        
    </div>
  )
}

export default Home