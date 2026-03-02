-- Data Manipulation Queries for DM Companion
-- Mirrors CRUD operations implemented in server.js
// AI Citation: AI was not used for the creation of this file.

-- CHARACTERS
SELECT * FROM Characters;
INSERT INTO Characters (characterName, species, isPlayerCharacter, totalExperience, currentLevel, currentHP, maxHP, armorClass, alignment, profBonus)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
UPDATE Characters SET characterName=?, species=?, isPlayerCharacter=?, totalExperience=?, currentLevel=?, currentHP=?, maxHP=?, armorClass=?, alignment=?, profBonus=? WHERE characterID=?;
DELETE FROM Characters WHERE characterID=?;

-- ITEMS
SELECT * FROM Items;
INSERT INTO Items (itemName, itemType, rarity, weight) VALUES (?, ?, ?, ?);
UPDATE Items SET itemName=?, itemType=?, rarity=?, weight=? WHERE itemID=?;
DELETE FROM Items WHERE itemID=?;

-- AREAS
SELECT * FROM Areas;
INSERT INTO Areas (areaType, areaName) VALUES (?, ?);
UPDATE Areas SET areaType=?, areaName=? WHERE areaID=?;
DELETE FROM Areas WHERE areaID=?;

-- QUESTS
SELECT q.questID, q.questName, q.questDescription, q.questLevel, q.areaID,
	   a.areaName
FROM Quests q
LEFT JOIN Areas a ON q.areaID = a.areaID;
INSERT INTO Quests (questName, questDescription, questLevel, areaID) VALUES (?, ?, ?, ?);
UPDATE Quests SET questName=?, questDescription=?, questLevel=?, areaID=? WHERE questID=?;
DELETE FROM Quests WHERE questID=?;

-- MONSTERS
SELECT * FROM Monsters;
INSERT INTO Monsters (monsterName, maxHP, challengeRating, sourceBook, sourcePage, experiencePoints) VALUES (?, ?, ?, ?, ?, ?);
UPDATE Monsters SET monsterName=?, maxHP=?, challengeRating=?, sourceBook=?, sourcePage=?, experiencePoints=? WHERE monsterID=?;
DELETE FROM Monsters WHERE monsterID=?;

-- CHARACTER_ITEMS (intersection)
SELECT ci.characterID, ci.itemID, ci.quantity, ci.isEquipped,
	   c.characterName, i.itemName
FROM Character_Items ci
JOIN Characters c ON ci.characterID = c.characterID
JOIN Items i ON ci.itemID = i.itemID;
INSERT INTO Character_Items (characterID, itemID, quantity, isEquipped) VALUES (?, ?, ?, ?);
UPDATE Character_Items SET quantity=?, isEquipped=? WHERE characterID=? AND itemID=?;
DELETE FROM Character_Items WHERE characterID=? AND itemID=?;

-- CHARACTER_QUESTS (intersection)
SELECT cq.characterID, cq.questID, cq.status,
	   c.characterName, q.questName
FROM Character_Quests cq
JOIN Characters c ON cq.characterID = c.characterID
JOIN Quests q ON cq.questID = q.questID;
INSERT INTO Character_Quests (characterID, questID, status) VALUES (?, ?, ?);
UPDATE Character_Quests SET status=? WHERE characterID=? AND questID=?;
DELETE FROM Character_Quests WHERE characterID=? AND questID=?;

-- MONSTER_AREAS (intersection)
SELECT ma.monsterID, ma.areaID, ma.quantity,
	   m.monsterName, a.areaName
FROM Monster_Areas ma
JOIN Monsters m ON ma.monsterID = m.monsterID
JOIN Areas a ON ma.areaID = a.areaID;
INSERT INTO Monster_Areas (monsterID, areaID, quantity) VALUES (?, ?, ?);
UPDATE Monster_Areas SET quantity=? WHERE monsterID=? AND areaID=?;
DELETE FROM Monster_Areas WHERE monsterID=? AND areaID=?;
