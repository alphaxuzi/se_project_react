import { useState } from "react";
import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

const RegisterModal = ({ isOpen, onClose, onSignup, handleLogin }) => {
  
    const [formData, setFormData] = useState({
      email: "",
      password: "",
      name: "",
      avatar: "",
    })
  
    const handleChange = (event) => {
      const {name, value} = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSignup(formData);
    }
  return (
    <>
      <ModalWithForm
        buttonText={"Next"}
        title={"Sign up"}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <label htmlFor="email" className="modal__label">
          <p className="modal__input_header">Email</p>
          <input
            placeholder="Email"
            type="email"
            className="modal__input"
            id="email-register"
            name="email"
            onChange={handleChange}
            value={formData.email}
          />
        </label>
        <label htmlFor="password" className="modal__label">
          <p className="modal__input_header">Password</p>
          <input
            placeholder="Password"
            type="passwor"
            className="modal__input"
            name="password"
            id="password-register"
            onChange={handleChange}
            value={formData.password}
          />
        </label>
        <label htmlFor="name" className="modal__label">
          <p className="modal__input_header">Name</p>
          <input
            placeholder="Name"
            type="text"
            className="modal__input"
            id="name-register"
            name="name"
            onChange={handleChange}
            value={formData.name}
          />
        </label>
        <label htmlFor="imageURL" className="modal__label">
          <p className="modal__input_header">Image</p>
          <input
            placeholder="Image URL"
            type="url"
            className="modal__input"
            id="imageURL-register"
            name="avatar"
            onChange={handleChange}
            value={formData.avatar}
          />
        </label>
      
          <button onClick={handleLogin} className="modal__login_button">or Log in</button>

      </ModalWithForm>
    </>
  );
};

export default RegisterModal;
