import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function EditProfileModal({isOpen, onClose, updateProfile}) {
  const currentUser = useContext(CurrentUserContext);

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

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        avatar: currentUser.avatar || ""
      })
    }
  }, [currentUser, isOpen])


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
          id="name-editprof"
          name="name"
          onChange={handleChange}
          value={formData.name}
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
          value={formData.avatar}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
