
import "./testimonial.scss";

import ava01 from "../../../assets/all-images/ava-1.jpg";
import ava02 from "../../../assets/all-images/ava-2.jpg";
import ava03 from "../../../assets/all-images/ava-3.jpg";
import ava04 from "../../../assets/all-images/ava-4.jpg";

const testimonials = [
    {
      id: 1,
      image: ava01,
      name: "John Doe",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.",
    },
    {
      id: 2,
      image: ava02,
      name: "Jane Doe",
      text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    },
    {
      id: 3,
      image: ava03,
      name: "Jim Beam",
      text: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: 4,
      image: ava04,
      name: "Elisa Maza",
      text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
  ];
  
  const Testimonial = () => {
    return (
        <>
          <h1 className="text-center font-bold">Our Testimonials</h1>
          <div className="testimonial-container">
        {testimonials.slice(0,3).map((testimonial) => (
          <div key={testimonial.id} className="testimonial">
            <img src={testimonial.image} alt={testimonial.name} className="testimonial-img" />
            <h5>{testimonial.name}</h5>
            <p>{testimonial.text}</p>
          </div>
        ))}
      </div>
        </>
    
    );
  };
  
  export default Testimonial;