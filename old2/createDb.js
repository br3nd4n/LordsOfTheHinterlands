var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data.db');

  db.run("CREATE TABLE users (tag TEXT ,password TEXT)");
  db.run("CREATE TABLE userBattles (userId INTEGER,battleId INTEGER, jsonActiveCards TEXT, jsonCurrentDeck TEXT)");
  db.run("CREATE TABLE battles (battleName TEXT, boardId INTEGER, lastUpdate INTEGER, jsonBoardState TEXT)");
  db.run("CREATE TABLE boards (boardName TEXT, jsonBoardObject TEXT)");
  db.run("CREATE TABLE cities (cityName TEXT, userId INTEGER, jsonActiveBuildings TEXT)");

  db.run("CREATE TABLE buildinglibrary (buildingName TEXT, jsonBuildingObject TEXT)");
  db.run("CREATE TABLE cardlibrary (cardName TEXT,jsonCardObject TEXT)");


db.close();
