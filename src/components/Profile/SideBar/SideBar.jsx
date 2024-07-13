import "./SideBar.css";
import avatar from "../../../assets/avatar.png";

function SideBar() {
  return (
    <div className="sidebar__container">
      <img className="sidebar__avatar" alt="pfp" src={avatar} />
      <p className="sidebar__name">firstname lastname</p>
    </div>
  );
}

export default SideBar;
