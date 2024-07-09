import { useState } from "react";
import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const [link, setUrl] = useState("");
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const [weather, setWeather] = useState("");
  const handleWeatherType = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, link, weather });
  };

  return (
    <>
      <ModalWithForm
        buttonText={"Add garment"}
        title={"New Garment"}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" className="modal__label">
          <p className="modal__input_header">Name</p>
          <input
            placeholder="Name"
            type="text"
            className="modal__input"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
        </label>
        <label htmlFor="imageURL" className="modal__label">
          <p className="modal__input_header">Image</p>
          <input
            placeholder="Image URL"
            type="url"
            className="modal__input"
            id="imageURL"
            value={link}
            onChange={handleUrlChange}
          />
        </label>
        <p className="modal__input_header">Select the weather type: </p>
        <fieldset className="modal__radio-inputs">
          <div className="modal__input_wrapper">
            <input
              type="radio"
              className="modal__radio-input"
              name="group1"
              id="Hot"
              value="Hot"
              checked={weather === "Hot"}
              onChange={handleWeatherType}
            />{" "}
            <label htmlFor="Hot"> Hot</label>
          </div>
          <div className="modal__input_wrapper">
            <input
              type="radio"
              className="modal__radio-input"
              id="Warm"
              name="group1"
              value="Warm"
              checked={weather === "Warm"}
              onChange={handleWeatherType}
            />
            <label htmlFor="Warm"> Warm</label>
          </div>
          <div className="modal__input_wrapper">
            <input
              type="radio"
              className="modal__radio-input"
              id="Cold"
              name="group1"
              value="Cold"
              checked={weather === "Cold"}
              onChange={handleWeatherType}
            />
            <label htmlFor="Cold"> Cold</label>
          </div>
        </fieldset>
      </ModalWithForm>
    </>
  );
};

export default AddItemModal;
