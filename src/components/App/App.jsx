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
import { Route, Routes, useLocation } from "react-router-dom";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import {
  getItems,
  addCard,
  deleteCard,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { signin, signup, checkToken, editProfile } from "../../auth";
import { useNavigate } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: "", C: "" },
    city: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAddClick = () => {
    setActiveModal("New Garment");
  };

  const openLogin = () => {
    setActiveModal("Log in");
  };

  const openRegister = () => {
    setActiveModal("Sign up");
  };

  const handleEditProfile = () => {
    setActiveModal("Edit profile");
  };

  const onClose = () => {
    setActiveModal("");
  };

  const onAddItem = (item) => {
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

  const handleRegistration = ({ name, avatar, email, password }) => {
    console.log({ name, avatar, email, password });
    signup({ name, avatar, email, password })
      .then(() => {
        setIsLoggedIn(true);
        onClose();
      })
      .catch((err) => {
        console.error("", err);
      });
  };

  const handleSignIn = ({ email, password }) => {
    signin({ email, password })
      .then((res) => {
        setIsLoggedIn(true);
        localStorage.setItem("jwt", res.token);
        navigate("/profile");
        onClose();
      })
      .catch((err) => {
        console.error("Can not log in", err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/");
  };

  const updateProfile = ({ name, avatar }) => {
    editProfile({ name, avatar })
      .then((res) => {
        setCurrentUser(res);
        onClose();
      })
      .catch((err) => {
        console.error(`Sorry, there was an error ${err}`);
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

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      checkToken(token)
        .then((user) => {
          setIsLoggedIn(true);
          setCurrentUser(user);
        })
        .catch((err) => {
          console.error("Token verification failed:", err);
          localStorage.removeItem("jwt");
        });
    } else {
      setIsLoggedIn(false);
      setCurrentUser(false);
    }
  }, [navigate, location.pathname]);

  const handleAddNewItem = ({ name, imageUrl, weather }) => {
    addCard({ name, imageUrl, weather, owner: currentUser._id })
      .then((item) => {
        setClothingItems((prevItems) => {
          return [item.data, ...prevItems];
        });
        onClose();
      })
      .catch((err) => {
        console.error("Error adding item:", err);
      });
  };

  const handleCardLike = (card) => {
    const token = localStorage.getItem("jwt");
    const isLiked = card.likes.some((userId) => userId === currentUser._id);
    const id = card._id;

    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              isLoggedIn={isLoggedIn}
              openLogin={openLogin}
              openRegister={openRegister}
              handleAddClick={handleAddClick}
              weatherData={weatherData}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleImageClick={handleImageClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
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
                    handleEditProfile={handleEditProfile}
                    onCardLike={handleCardLike}
                    onLogout={handleLogout}
                  />
                }
              ></Route>
            </Routes>

            <Footer />
          </div>

          <AddItemModal
            isOpen={activeModal === "New Garment"}
            onClose={onClose}
            onAddItem={onAddItem}
            handleAddNewItem={handleAddNewItem}
          />

          <ItemModal
            activeModal={activeModal}
            selectedCard={selectedCard}
            onClose={onClose}
            handleDeleteCard={handleDeleteCard}
          />

          <RegisterModal
            isOpen={activeModal === "Sign up"}
            onClose={onClose}
            onSignup={handleRegistration}
            openLogin={openLogin}
          />

          <LoginModal
            isOpen={activeModal === "Log in"}
            onClose={onClose}
            onLogin={handleSignIn}
            openRegister={openRegister}
          />

          <EditProfileModal
            isOpen={activeModal === "Edit profile"}
            onClose={onClose}
            updateProfile={updateProfile}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
