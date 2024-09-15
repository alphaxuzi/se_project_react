import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

function EditProfileModal({isOpen, onClose, updateProfile}) {
    const [formData, setFormData] = useState({
        name: "",
        avatar: "",
      })

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData)
  }


  return (
    <ModalWithForm
      buttonText={"Save changes"}
      title={"Change profile data"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        <p className="modal__input_header">Name</p>
        <input
          placeholder="Name"
          type="name"
          className="modal__input"
          id="name"
          name="name"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        <p className="modal__input_header">Avatar</p>
        <input
          placeholder="Avatar"
          type="url"
          className="modal__input"
          name="avatar"
          id="avatar"
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
