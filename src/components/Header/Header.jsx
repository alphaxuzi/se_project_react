import "./Header.css";
import logo from "../../assets/WTWR-Logo.svg";
import avatar from "../../assets/avatar.png";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });

  return (
    <header className="header">
      <img className="header__logo" src={logo} />
      <p className="header__date-and-location">{currentDate}, {weatherData.city}</p>
      <button onClick={handleAddClick} type="button" className="header__button">
        + Add Clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">firstname lastname</p>
        <img src={avatar} alt="" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
