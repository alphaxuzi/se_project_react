import "./Profile.css";
import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";

function Profile({
  weatherData,
  handleImageClick,
  handleAddClick,
  clothingItems,
  handleDeleteCard,
  handleEditProfile,
  onCardLike,
  onLogout
}) {
  return (
    <div className="profile__container">
      <SideBar handleEditProfile={handleEditProfile} onLogout={onLogout} />
      <ClothesSection
        weatherData={weatherData}
        handleImageClick={handleImageClick}
        handleAddClick={handleAddClick}
        clothingItems={clothingItems}
        handleDeleteCard={handleDeleteCard}
        onCardLike={onCardLike}
        
      />
    </div>
  );
}

export default Profile;
