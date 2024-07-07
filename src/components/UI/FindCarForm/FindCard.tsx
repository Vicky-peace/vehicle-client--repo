import './findcard.scss'

const FindCard = () => {
  return (
    <form className="form">
        <h1>Find your best Car</h1>
      <div className="flex ">
        <div className="form__group">
          <input type="text" placeholder="From address" required />
        </div>

        <div className="form__group">
          <input type="text" placeholder="To address" required />
        </div>

        <div className="form__group">
          <input type="date" placeholder="Journey date" required />
        </div>


        <div className="form__group">
          <button type="submit" className="btn find__car-btn">Find Car</button>
        </div>
      </div>
    </form>
  );
};

export default FindCard;
