-- Data Manipulation Queries for DM Companion
-- Mirrors CRUD operations implemented in server.js
// AI Citation: AI was not used for the creation of this file.

-- CHARACTERS
SELECT * FROM Characters;
CALL Characters_Insert(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
CALL Characters_Update(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
CALL Characters_Delete(?);

-- ITEMS
SELECT * FROM Items;
CALL Items_Insert(?, ?, ?, ?);
CALL Items_Update(?, ?, ?, ?, ?);
CALL Items_Delete(?);

-- AREAS
SELECT * FROM Areas;
CALL Areas_Insert(?, ?);
CALL Areas_Update(?, ?, ?);
CALL Areas_Delete(?);

-- QUESTS
SELECT q.questID, q.questName, q.questDescription, q.questLevel, q.areaID,
	   a.areaName
FROM Quests q
LEFT JOIN Areas a ON q.areaID = a.areaID;
CALL Quests_Insert(?, ?, ?, ?);
CALL Quests_Update(?, ?, ?, ?, ?);
CALL Quests_Delete(?);

-- MONSTERS
SELECT * FROM Monsters;
CALL Monsters_Insert(?, ?, ?, ?, ?, ?);
CALL Monsters_Update(?, ?, ?, ?, ?, ?, ?);
CALL Monsters_Delete(?);

-- CHARACTER_ITEMS (intersection)
SELECT ci.characterID, ci.itemID, ci.quantity, ci.isEquipped,
	   c.characterName, i.itemName
FROM Character_Items ci
JOIN Characters c ON ci.characterID = c.characterID
JOIN Items i ON ci.itemID = i.itemID;
CALL CharacterItems_Insert(?, ?, ?, ?);
CALL CharacterItems_Update(?, ?, ?, ?, ?, ?);
CALL CharacterItems_Delete(?, ?);

-- CHARACTER_QUESTS (intersection)
SELECT cq.characterID, cq.questID, cq.status,
	   c.characterName, q.questName
FROM Character_Quests cq
JOIN Characters c ON cq.characterID = c.characterID
JOIN Quests q ON cq.questID = q.questID;
CALL CharacterQuests_Insert(?, ?, ?);
CALL CharacterQuests_Update(?, ?, ?, ?, ?);
CALL CharacterQuests_Delete(?, ?);

-- MONSTER_AREAS (intersection)
SELECT ma.monsterID, ma.areaID, ma.quantity,
	   m.monsterName, a.areaName
FROM Monster_Areas ma
JOIN Monsters m ON ma.monsterID = m.monsterID
JOIN Areas a ON ma.areaID = a.areaID;
CALL MonsterAreas_Insert(?, ?, ?);
CALL MonsterAreas_Update(?, ?, ?, ?, ?);
CALL MonsterAreas_Delete(?, ?);
