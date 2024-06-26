import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card }) {
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
        <img className="modal__image" src={card.link}></img>
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
