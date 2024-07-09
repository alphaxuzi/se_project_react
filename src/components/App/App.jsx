import { useEffect, useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import main from "../../main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey, defaultClothingItems } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Route, Routes} from "react-router-dom";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";

function App() {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: "" , C: "" },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  const handleAddClick = () => {
    setActiveModal("New Garment");
  };

  const onClose = () => {
    setActiveModal("");
  };

  const onAddItem = (item) => {
    item._id = Date.now().toString();
    console.log(item);
    setClothingItems([item, ...clothingItems]);
    onClose();
  };

  const handleImageClick = (card) => {
    setActiveModal("garment-popup");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
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
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleImageClick={handleImageClick}
                  clothingItems={clothingItems}
                />
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <Profile
                  weatherData={weatherData}
                  handleAddClick={handleAddClick}
                  handleImageClick={handleImageClick}
                />
              }
            ></Route>
          </Routes>

          <Footer />
        </div>
        {activeModal === "New Garment" && (
          <AddItemModal
            isOpen={activeModal === "New Garment"}
            onClose={onClose}
            onAddItem={onAddItem}
          />
        )}
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={onClose}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
