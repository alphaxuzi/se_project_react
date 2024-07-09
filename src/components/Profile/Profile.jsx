import "./Profile.css";
import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";

function Profile({ weatherData, handleImageClick, handleAddClick }) {
  return (
    <>
      <div className="profile__container">
        <SideBar />
        <ClothesSection
          weatherData={weatherData}
          handleImageClick={handleImageClick}
          handleAddClick={handleAddClick}
        />
      </div>
    </>
  );
}

export default Profile;
