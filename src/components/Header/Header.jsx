import "./Header.css";
import logo from "../../assets/WTWR-Logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  openLogin,
  openRegister,
}) {
  
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" alt="logo" src={logo} />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      {isLoggedIn && currentUser ? (
        <>
          <div className="header__buttons">
            <button
              onClick={handleAddClick}
              type="button"
              className="header__button"
            >
              + Add Clothes
            </button>
          </div>
          <Link className="header__link" to="/profile">
            <div className="header__user-container">
              <p className="header__username">
                {currentDate ? currentUser.name : "User"}
              </p>

              <img
                src={currentUser.avatar}
                alt="User Avatar"
                className="header__avatar"
              />
            </div>
          </Link>
        </>
      ) : (
        <>
          <ToggleSwitch />
          <button onClick={openLogin} className="header__login-button">
            Log in
          </button>
          <button onClick={openRegister} className="header__signup-button">
            Sign up
          </button>
        </>
      )}
    </header>
  );
}

export default Header;
