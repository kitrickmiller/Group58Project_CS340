-- Stored Procedures for app CRUD operations and reset/demo actions.
-- Run this file after sql/DDL.SQL.
-- AI Citation: AI was not used for the creation of this file.

DROP PROCEDURE IF EXISTS Characters_Insert;
DROP PROCEDURE IF EXISTS Characters_Update;
DROP PROCEDURE IF EXISTS Characters_Delete;

DROP PROCEDURE IF EXISTS Items_Insert;
DROP PROCEDURE IF EXISTS Items_Update;
DROP PROCEDURE IF EXISTS Items_Delete;

DROP PROCEDURE IF EXISTS Areas_Insert;
DROP PROCEDURE IF EXISTS Areas_Update;
DROP PROCEDURE IF EXISTS Areas_Delete;

DROP PROCEDURE IF EXISTS Quests_Insert;
DROP PROCEDURE IF EXISTS Quests_Update;
DROP PROCEDURE IF EXISTS Quests_Delete;

DROP PROCEDURE IF EXISTS Monsters_Insert;
DROP PROCEDURE IF EXISTS Monsters_Update;
DROP PROCEDURE IF EXISTS Monsters_Delete;

DROP PROCEDURE IF EXISTS CharacterItems_Insert;
DROP PROCEDURE IF EXISTS CharacterItems_Update;
DROP PROCEDURE IF EXISTS CharacterItems_Delete;

DROP PROCEDURE IF EXISTS CharacterQuests_Insert;
DROP PROCEDURE IF EXISTS CharacterQuests_Update;
DROP PROCEDURE IF EXISTS CharacterQuests_Delete;

DROP PROCEDURE IF EXISTS MonsterAreas_Insert;
DROP PROCEDURE IF EXISTS MonsterAreas_Update;
DROP PROCEDURE IF EXISTS MonsterAreas_Delete;

DROP PROCEDURE IF EXISTS DemoDeleteArin;

DELIMITER //

CREATE PROCEDURE Characters_Insert(
    IN pCharacterName VARCHAR(100),
    IN pSpecies VARCHAR(50),
    IN pIsPlayerCharacter TINYINT,
    IN pTotalExperience INT,
    IN pCurrentLevel INT,
    IN pCurrentHP INT,
    IN pMaxHP INT,
    IN pArmorClass INT,
    IN pAlignment VARCHAR(50),
    IN pProfBonus INT
)
BEGIN
    INSERT INTO Characters (characterName, species, isPlayerCharacter, totalExperience, currentLevel, currentHP, maxHP, armorClass, alignment, profBonus)
    VALUES (pCharacterName, pSpecies, pIsPlayerCharacter, pTotalExperience, pCurrentLevel, pCurrentHP, pMaxHP, pArmorClass, pAlignment, pProfBonus);
END //

CREATE PROCEDURE Characters_Update(
    IN pCharacterID INT,
    IN pCharacterName VARCHAR(100),
    IN pSpecies VARCHAR(50),
    IN pIsPlayerCharacter TINYINT,
    IN pTotalExperience INT,
    IN pCurrentLevel INT,
    IN pCurrentHP INT,
    IN pMaxHP INT,
    IN pArmorClass INT,
    IN pAlignment VARCHAR(50),
    IN pProfBonus INT
)
BEGIN
    UPDATE Characters
    SET characterName = pCharacterName,
        species = pSpecies,
        isPlayerCharacter = pIsPlayerCharacter,
        totalExperience = pTotalExperience,
        currentLevel = pCurrentLevel,
        currentHP = pCurrentHP,
        maxHP = pMaxHP,
        armorClass = pArmorClass,
        alignment = pAlignment,
        profBonus = pProfBonus
    WHERE characterID = pCharacterID;
END //

CREATE PROCEDURE Characters_Delete(IN pCharacterID INT)
BEGIN
    DELETE FROM Characters WHERE characterID = pCharacterID;
END //

CREATE PROCEDURE Items_Insert(
    IN pItemName VARCHAR(50),
    IN pItemType VARCHAR(50),
    IN pRarity VARCHAR(50),
    IN pWeight INT
)
BEGIN
    INSERT INTO Items (itemName, itemType, rarity, weight)
    VALUES (pItemName, pItemType, pRarity, pWeight);
END //

CREATE PROCEDURE Items_Update(
    IN pItemID INT,
    IN pItemName VARCHAR(50),
    IN pItemType VARCHAR(50),
    IN pRarity VARCHAR(50),
    IN pWeight INT
)
BEGIN
    UPDATE Items
    SET itemName = pItemName,
        itemType = pItemType,
        rarity = pRarity,
        weight = pWeight
    WHERE itemID = pItemID;
END //

CREATE PROCEDURE Items_Delete(IN pItemID INT)
BEGIN
    DELETE FROM Items WHERE itemID = pItemID;
END //

CREATE PROCEDURE Areas_Insert(
    IN pAreaType VARCHAR(50),
    IN pAreaName VARCHAR(50)
)
BEGIN
    INSERT INTO Areas (areaType, areaName)
    VALUES (pAreaType, pAreaName);
END //

CREATE PROCEDURE Areas_Update(
    IN pAreaID INT,
    IN pAreaType VARCHAR(50),
    IN pAreaName VARCHAR(50)
)
BEGIN
    UPDATE Areas
    SET areaType = pAreaType,
        areaName = pAreaName
    WHERE areaID = pAreaID;
END //

CREATE PROCEDURE Areas_Delete(IN pAreaID INT)
BEGIN
    DELETE FROM Areas WHERE areaID = pAreaID;
END //

CREATE PROCEDURE Quests_Insert(
    IN pQuestName VARCHAR(100),
    IN pQuestDescription TEXT,
    IN pQuestLevel INT,
    IN pAreaID INT
)
BEGIN
    INSERT INTO Quests (questName, questDescription, questLevel, areaID)
    VALUES (pQuestName, pQuestDescription, pQuestLevel, pAreaID);
END //

CREATE PROCEDURE Quests_Update(
    IN pQuestID INT,
    IN pQuestName VARCHAR(100),
    IN pQuestDescription TEXT,
    IN pQuestLevel INT,
    IN pAreaID INT
)
BEGIN
    UPDATE Quests
    SET questName = pQuestName,
        questDescription = pQuestDescription,
        questLevel = pQuestLevel,
        areaID = pAreaID
    WHERE questID = pQuestID;
END //

CREATE PROCEDURE Quests_Delete(IN pQuestID INT)
BEGIN
    DELETE FROM Quests WHERE questID = pQuestID;
END //

CREATE PROCEDURE Monsters_Insert(
    IN pMonsterName VARCHAR(50),
    IN pMaxHP INT,
    IN pChallengeRating INT,
    IN pSourceBook VARCHAR(50),
    IN pSourcePage INT,
    IN pExperiencePoints INT
)
BEGIN
    INSERT INTO Monsters (monsterName, maxHP, challengeRating, sourceBook, sourcePage, experiencePoints)
    VALUES (pMonsterName, pMaxHP, pChallengeRating, pSourceBook, pSourcePage, pExperiencePoints);
END //

CREATE PROCEDURE Monsters_Update(
    IN pMonsterID INT,
    IN pMonsterName VARCHAR(50),
    IN pMaxHP INT,
    IN pChallengeRating INT,
    IN pSourceBook VARCHAR(50),
    IN pSourcePage INT,
    IN pExperiencePoints INT
)
BEGIN
    UPDATE Monsters
    SET monsterName = pMonsterName,
        maxHP = pMaxHP,
        challengeRating = pChallengeRating,
        sourceBook = pSourceBook,
        sourcePage = pSourcePage,
        experiencePoints = pExperiencePoints
    WHERE monsterID = pMonsterID;
END //

CREATE PROCEDURE Monsters_Delete(IN pMonsterID INT)
BEGIN
    DELETE FROM Monsters WHERE monsterID = pMonsterID;
END //

CREATE PROCEDURE CharacterItems_Insert(
    IN pCharacterID INT,
    IN pItemID INT,
    IN pQuantity INT,
    IN pIsEquipped TINYINT
)
BEGIN
    INSERT INTO Character_Items (characterID, itemID, quantity, isEquipped)
    VALUES (pCharacterID, pItemID, pQuantity, pIsEquipped);
END //

CREATE PROCEDURE CharacterItems_Update(
    IN pOldCharacterID INT,
    IN pOldItemID INT,
    IN pNewCharacterID INT,
    IN pNewItemID INT,
    IN pQuantity INT,
    IN pIsEquipped TINYINT
)
BEGIN
    UPDATE Character_Items
    SET characterID = pNewCharacterID,
        itemID = pNewItemID,
        quantity = pQuantity,
        isEquipped = pIsEquipped
    WHERE characterID = pOldCharacterID
      AND itemID = pOldItemID;
END //

CREATE PROCEDURE CharacterItems_Delete(
    IN pCharacterID INT,
    IN pItemID INT
)
BEGIN
    DELETE FROM Character_Items
    WHERE characterID = pCharacterID
      AND itemID = pItemID;
END //

CREATE PROCEDURE CharacterQuests_Insert(
    IN pCharacterID INT,
    IN pQuestID INT,
    IN pStatus VARCHAR(50)
)
BEGIN
    INSERT INTO Character_Quests (characterID, questID, status)
    VALUES (pCharacterID, pQuestID, pStatus);
END //

CREATE PROCEDURE CharacterQuests_Update(
    IN pOldCharacterID INT,
    IN pOldQuestID INT,
    IN pNewCharacterID INT,
    IN pNewQuestID INT,
    IN pStatus VARCHAR(50)
)
BEGIN
    UPDATE Character_Quests
    SET characterID = pNewCharacterID,
        questID = pNewQuestID,
        status = pStatus
    WHERE characterID = pOldCharacterID
      AND questID = pOldQuestID;
END //

CREATE PROCEDURE CharacterQuests_Delete(
    IN pCharacterID INT,
    IN pQuestID INT
)
BEGIN
    DELETE FROM Character_Quests
    WHERE characterID = pCharacterID
      AND questID = pQuestID;
END //

CREATE PROCEDURE MonsterAreas_Insert(
    IN pMonsterID INT,
    IN pAreaID INT,
    IN pQuantity INT
)
BEGIN
    INSERT INTO Monster_Areas (monsterID, areaID, quantity)
    VALUES (pMonsterID, pAreaID, pQuantity);
END //

CREATE PROCEDURE MonsterAreas_Update(
    IN pOldMonsterID INT,
    IN pOldAreaID INT,
    IN pNewMonsterID INT,
    IN pNewAreaID INT,
    IN pQuantity INT
)
BEGIN
    UPDATE Monster_Areas
    SET monsterID = pNewMonsterID,
        areaID = pNewAreaID,
        quantity = pQuantity
    WHERE monsterID = pOldMonsterID
      AND areaID = pOldAreaID;
END //

CREATE PROCEDURE MonsterAreas_Delete(
    IN pMonsterID INT,
    IN pAreaID INT
)
BEGIN
    DELETE FROM Monster_Areas
    WHERE monsterID = pMonsterID
      AND areaID = pAreaID;
END //

CREATE PROCEDURE DemoDeleteArin()
BEGIN
    DELETE FROM Characters
    WHERE characterName = 'Arin';
END //

DELIMITER ;
