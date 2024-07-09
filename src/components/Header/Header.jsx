import "./Header.css";
import logo from "../../assets/WTWR-Logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";


function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
      <img className="header__logo" src={logo} /> 
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <div className="header__user-container">
        <ToggleSwitch />
        <button
          onClick={handleAddClick}
          type="button"
          className="header__button"
        >
          + Add Clothes
        </button>
        
        <p className="header__username">firstname lastname</p>
        <Link to="/profile">
        <img src={avatar} alt="" className="header__avatar" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
