import "./ClothesSection.css";
import ItemCard from "../../ItemCard/ItemCard";
import { defaultClothingItems } from "../../../utils/constants";
import AddItemModal from "../../AddItemModal/AddItemModal";

function ClothesSection({
  weatherData,
  handleImageClick,
  handleAddClick,
  clothingItems,
  handleDeleteCard,
}) {
  return (
    <div className="c-section__container">
      <div className="c-section__top-part">
        <p className="c-section__header">Your items</p>
        <button className="c-section__button" onClick={handleAddClick}>
          {" "}
          + Add new
        </button>
      </div>
      <ul className="c-section__cards">
        {clothingItems
          .filter((item) => {
            return item.weather && weatherData.type;
          })
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleImageClick}
                onDelete={handleDeleteCard}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
