import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="box">
      <div className="container-1">
        <h1>cryptologia.</h1>
        <h3 className="home-subheading">
          Your one stop solution for live<br />price and latest news related to crypto.
        </h3>
        <div className="button-box">
          <Link to="/prices" className="link">
            <button className="custom-button">Live Price</button>
          </Link>
          <Link to="/news" className="link">
            <button className="custom-button">News</button>
          </Link>
        </div>
      </div>
      <div className="image-box">
        <img
          src="https://res.cloudinary.com/dzbdnlr0f/image/upload/v1643811454/6929da1d074844aa39ef45dfdefa8980_mztnag.webp"
          alt="cryptologia."
        />
      </div>
    </div>
  );
}