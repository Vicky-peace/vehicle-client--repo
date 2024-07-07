import './carcard.scss'

interface CarCardProps {
    image: string;
    carName: string;
    price: number;
    model: string;
  }

const CarCard:  React.FC<CarCardProps> = ({ image, carName, price, model}) => {
  return (
    <div className="car-card">
      <img src={image} alt={carName} className="car-image" />
      <h3>{carName}</h3>
      <p className="price">{price} / Day</p>
      <div className="features">
        <span>{model}</span>
      </div>
      <div className="actions">
        <button className="rent-btn">Rent</button>
        <button className="details-btn">Details</button>
      </div>
    </div>
  );
};

export default CarCard;
