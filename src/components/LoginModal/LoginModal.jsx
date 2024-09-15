import { useState } from "react";
import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";


const LoginModal = ({ isOpen, onClose, onLogin, handleRegister }) => {

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

  // const handleOrRegister = () {
  //   handleRegister();
  // }

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
          id="email"
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
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <button onClick={handleRegister} className="modal__login_button">or Register</button>
    </ModalWithForm>
  
  );
};

export default LoginModal;
