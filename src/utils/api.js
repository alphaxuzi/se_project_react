import { BASE_URL } from "./constants";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function getItems() {
  return fetch(`${BASE_URL}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
}

function addCard({ name, imageUrl, weather, owner }) {
  const token = localStorage.getItem("jwt");

  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
      owner
    }),
  }).then(checkResponse);
}

function deleteCard(cardId) {
  const token = localStorage.getItem('jwt');

  return fetch(`${BASE_URL}/items/${cardId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function addCardLike(itemId) {
  const token = localStorage.getItem('jwt');

  return fetch(`${BASE_URL}/items/${itemId}/likes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }).then(checkResponse)
}

function removeCardLike(itemId){
  const token = localStorage.getItem('jwt');
  
  return fetch(`${BASE_URL}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }).then(checkResponse)
}



export { getItems, addCard, deleteCard, addCardLike, removeCardLike, checkResponse };
