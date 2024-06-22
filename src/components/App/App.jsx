import { useEffect, useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "hot",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const handleAddClick = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
    setActiveModal("");
  };

  const handleImageClick = (card) => {
    setActiveModal("garment-popup");
    setSelectedCard(card);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleImageClick={handleImageClick} />
        <Footer />
        <ModalWithForm
          buttonText={"Add garment"}
          title={"New Garment"}
          isOpen={isOpen}
          onClose={onClose}
        >
          <label htmlFor="name" className="modal__label">
            <p className="modal__input_header">Name</p>
            <input
              placeholder="Name"
              type="text"
              className="modal__input"
              id="name"
            />
          </label>
          <label htmlFor="imageURL" className="modal__label">
            <p className="modal__input_header">Image</p>
            <input
              placeholder="Image URL"
              type="url"
              className="modal__input"
              id="imageURL"
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
              />{" "}
              <label htmlFor="Hot"> Hot</label>
            </div>
            <div className="modal__input_wrapper">
              <input
                type="radio"
                className="modal__radio-input"
                id="Warm"
                value="Warm"
                name="group1"
              />
              <label htmlFor="Warm"> Warm</label>
            </div>
            <div className="modal__input_wrapper">
              <input
                type="radio"
                className="modal__radio-input"
                id="Cold"
                value="Cold"
                name="group1"
              />
              <label htmlFor="Cold"> Cold</label>
            </div>
          </fieldset>
        </ModalWithForm>
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={onClose}
        />
      </div>
    </div>
  );
}

export default App;
