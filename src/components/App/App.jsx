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
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Route, Routes } from "react-router-dom";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getItems, addCard, deleteCard } from "../../utils/api";

function App() {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: "", C: "" },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [clothingItems, setClothingItems] = useState([]);

  const handleAddClick = () => {
    setActiveModal("New Garment");
  };

  const onClose = () => {
    setActiveModal("");
  };

  const onAddItem = (item) => {
    item._id = Date.now().toString();
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

  const handleDeleteCard = (cardId) => {
    deleteCard(cardId)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== cardId)
        );
        onClose();
      })
      .catch((err) => {
        console.error("Error deleting item:", err);
      });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getWeather(latitude, longitude, APIkey)
            .then((data) => {
              const filteredData = filterWeatherData(data);
              setWeatherData(filteredData);
            })
            .catch((err) => {
              console.error(err);
            });
        },
        (error) => {
          console.error("Error fetching geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleAddNewItem = (name, imageUrl, weather) => {
    addCard(name, imageUrl, weather)
      .then((data) => {
        onAddItem(data);
      })
      .catch((err) => {
        console.error("Error adding item:", err);
      });
  };

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
                  clothingItems={clothingItems}
                />
              }
            ></Route>
          </Routes>

          <Footer />
        </div>

        <AddItemModal
          isOpen={activeModal === "New Garment"}
          onClose={onClose}
          onAddItem={handleAddNewItem}
        />

        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={onClose}
          handleDeleteCard={handleDeleteCard}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
