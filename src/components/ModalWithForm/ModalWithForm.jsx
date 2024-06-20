import "./ModalWithForm.css";

function ModalWithForm({children, title, buttonText, activeModal, onClose }) {
  return (
    <>
      <div className={`modal ${activeModal === "add-garment" && "modal_opened"} `}>
        <div className="modal__container">
          <button onClick={onClose} type="button" className="modal__exit-button"></button>
          <h2 className="modal__header">{title}</h2>
          <form action="" className="modal__form">
            {children}
          </form>
          <button className="modal__submit-button">{buttonText}</button>
        </div>
      </div>
    </>
  );
}

export default ModalWithForm;
