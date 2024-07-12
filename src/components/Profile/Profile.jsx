import "./Profile.css";
import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";

function Profile({
  weatherData,
  handleImageClick,
  handleAddClick,
  clothingItems,
  handleDeleteCard,
}) {
  return (
    <div className="profile__container">
      <SideBar />
      <ClothesSection
        weatherData={weatherData}
        handleImageClick={handleImageClick}
        handleAddClick={handleAddClick}
        clothingItems={clothingItems}
        handleDeleteCard={handleDeleteCard}
      />
    </div>
  );
}

export default Profile;
