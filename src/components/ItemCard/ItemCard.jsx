import "./ItemCard.css";
import React from "react";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { name, imageUrl, likes, _id } = item;

  const currentUser = React.useContext(CurrentUserContext);

  const isLiked = likes.some((userId) => userId === currentUser._id);

  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_liked" : ""
  }`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike(item);
    isLiked ? "Unlike" : "Like";
  };

  return (
    <div className="card">
      <h2 className="card__title">{item.name}</h2>
      {currentUser ? (
        <button
          onClick={handleLike}
          className={itemLikeButtonClassName}
        ></button>
      ) : (
        ""
      )}
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </div>
  );
}

export default ItemCard;
