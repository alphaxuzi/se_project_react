import "./ItemModal.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, onClose, selectedCard: card, handleDeleteCard }) {
  const currentUser = useContext(CurrentUserContext);

  const handleDeleteClick = () => {
    handleDeleteCard(card._id);
  };

  const isOwn = currentUser && card.owner === currentUser._id;

  const itemDeleteButtonClassName = `modal__delete-button ${
    isOwn ? "modal__delete-button_visible" : "modal__delete-button_hidden"
  }`;

  return (
    <div
      className={`modal ${activeModal === "garment-popup" && "modal_opened"} `}
    >
      <div className="modal__container modal__container_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__exit-button"
        ></button>
        <img className="modal__image" alt={card.name} src={card.imageUrl}></img>
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          {isOwn && (
            <button
              type="button"
              onClick={handleDeleteClick}
              className={itemDeleteButtonClassName}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
