import { useState } from "react";
import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const [imageUrl, setUrl] = useState("");
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const [weather, setWeather] = useState("");
  const handleWeatherType = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(name, imageUrl, weather);
  };

  return (
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
          value={imageUrl}
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
            id="hot"
            value="hot"
            checked={weather === "hot"}
            onChange={handleWeatherType}
          />{" "}
          <label htmlFor="hot"> Hot</label>
        </div>
        <div className="modal__input_wrapper">
          <input
            type="radio"
            className="modal__radio-input"
            id="warm"
            name="group1"
            value="warm"
            checked={weather === "warm"}
            onChange={handleWeatherType}
          />
          <label htmlFor="warm"> Warm</label>
        </div>
        <div className="modal__input_wrapper">
          <input
            type="radio"
            className="modal__radio-input"
            id="cold"
            name="group1"
            value="cold"
            checked={weather === "cold"}
            onChange={handleWeatherType}
          />
          <label htmlFor="cold"> Cold</label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
