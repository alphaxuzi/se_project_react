import { useState } from "react";
import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose, onLogin, openRegister }) => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    onLogin(formData);
  }

 
  const handleRegisterClick = (e) => {
    e.preventDefault(); 
    openRegister(); 
  };

  return (
    <ModalWithForm
      buttonText={"Log in"}
      title={"Log in"}
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
          id="email-login"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        <p className="modal__input_header">Password</p>
        <input
          placeholder="Password"
          name="password"
          type="password"
          className="modal__input"
          id="password-login"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <button onClick={handleRegisterClick} className="modal__login_button">or Register</button>
    </ModalWithForm>
  
  );
};

export default LoginModal;
