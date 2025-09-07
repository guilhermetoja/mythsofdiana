import Database from "better-sqlite3";

const db = new Database("cards.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS cards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    cost INTEGER,
    effect TEXT)`);

process.on("exit", () => {
  console.log("Closing db");
  db.close();
});

process.on("SIGINT", () => {
  process.exit(0);
});

const createCard = db.prepare(
  "INSERT INTO cards (name, cost, effect) VALUES (@name, @cost, @effect)"
);

const getAllCards = db.prepare("SELECT * FROM cards");

const getCardById = db.prepare("SELECT * FROM card WHERE id = @id");

export default db;
