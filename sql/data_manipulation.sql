-- Data Manipulation Queries for DM Companion
-- Each section includes SELECT, INSERT, UPDATE, DELETE for each entity table (and intersections)

-- CHARACTERS
SELECT * FROM Characters;
INSERT INTO Characters (characterName, species, isPlayerCharacter, totalExperience, currentLevel, currentHP, maxHP, armorClass, alignment, profBonus)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?); // ? are placeholders for query parameters
UPDATE Characters SET characterName=?, species=?, isPlayerCharacter=?, totalExperience=?, currentLevel=?, currentHP=?, maxHP=?, armorClass=?, alignment=?, profBonus=? WHERE characterID=?;
DELETE FROM Characters WHERE characterID=?;

-- ITEMS
SELECT * FROM Items;
INSERT INTO Items (itemName, itemType, rarity, weight) VALUES (?, ?, ?, ?);
UPDATE Items SET itemName=?, itemType=?, rarity=?, weight=? WHERE itemID=?;
DELETE FROM Items WHERE itemID=?;

-- QUESTS
SELECT * FROM Quests;
INSERT INTO Quests (questName, questDescription, questLevel, areaID) VALUES (?, ?, ?, ?);
UPDATE Quests SET questName=?, questDescription=?, questLevel=?, areaID=? WHERE questID=?;
DELETE FROM Quests WHERE questID=?;

-- AREAS
SELECT * FROM Areas;
INSERT INTO Areas (areaType, areaName) VALUES (?, ?);
UPDATE Areas SET areaType=?, areaName=? WHERE areaID=?;
DELETE FROM Areas WHERE areaID=?;

-- MONSTERS
SELECT * FROM Monsters;
INSERT INTO Monsters (monsterName, maxHP, challengeRating, sourceBook, sourcePage, experiencePoints) VALUES (?, ?, ?, ?, ?, ?);
UPDATE Monsters SET monsterName=?, maxHP=?, challengeRating=?, sourceBook=?, sourcePage=?, experiencePoints=? WHERE monsterID=?;
DELETE FROM Monsters WHERE monsterID=?;

-- CHARACTER_ITEMS (intersection)
SELECT * FROM Character_Items;
INSERT INTO Character_Items (characterID, itemID, quantity, isEquipped) VALUES (?, ?, ?, ?);
UPDATE Character_Items SET quantity=?, isEquipped=? WHERE characterID=? AND itemID=?;
DELETE FROM Character_Items WHERE characterID=? AND itemID=?;

-- CHARACTER_QUESTS (intersection)
SELECT * FROM Character_Quests;
INSERT INTO Character_Quests (characterID, questID, status) VALUES (?, ?, ?);
UPDATE Character_Quests SET status=? WHERE characterID=? AND questID=?;
DELETE FROM Character_Quests WHERE characterID=? AND questID=?;

-- MONSTER_AREAS (intersection)
SELECT * FROM Monster_Areas;
INSERT INTO Monster_Areas (monsterID, areaID, quantity) VALUES (?, ?, ?);
UPDATE Monster_Areas SET quantity=? WHERE monsterID=? AND areaID=?;
DELETE FROM Monster_Areas WHERE monsterID=? AND areaID=?;
