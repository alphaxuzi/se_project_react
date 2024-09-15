import "./SideBar.css";
import avatar from "../../../assets/avatar.png";

import { useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

function SideBar({ handleEditProfile, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar__container">
      {currentUser ? (
        <>
          <div className="sidebar__user-container">
            <img
              className="sidebar__avatar"
              alt="pfp"
              src={currentUser.avatar || avatarPlaceholder}
            />
            <p className="sidebar__name">
              {currentUser ? currentUser.name : "User"}
            </p>
          </div>
          <div className="sidebar__buttons">
            <button onClick={handleEditProfile} className="sidebar__button">
              Change profile data
            </button>
            <button onClick={onLogout} className="sidebar__button">
              Log out
            </button>
          </div>
        </>
      ) : (
        <p> Loading...</p>
      )}
    </div>
  );
}

export default SideBar;
