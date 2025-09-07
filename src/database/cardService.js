import db from "./db.js";

const insert = db.prepare(
  "INSERT INTO cards (name, cost, effect) VALUES (@name, @cost, @effect)"
);

const getAll = db.prepare("SELECT * FROM cards");

const getById = db.prepare("SELECT * FROM cards WHERE id = @id");

function createCard(name, cost, effect) {
  insert.run({ name, cost, effect });
}

function getAllCards() {
  const allCards = getAll.all();
  return allCards;
}

function getCardById(id) {
  const card = getById.get({ id });
  return card;
}

export { createCard, getAllCards, getCardById };
