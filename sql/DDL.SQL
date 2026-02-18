-- FULL DLL FILE FOR RPG DATABASE
-- This file contains the complete Data Definition Language (DDL) statements
-- required to create the RPG database schema, including tables, relationships,
-- and constraints.
-- The schema includes tables for Characters, Items, Areas, Quests, Monsters,
-- and the necessary intersection tables to manage many-to-many relationships.
-- It also will provide the SQL statements that insert sample data into these tables.

SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;
START TRANSACTION;

-- DROP TABLES IF THEY EXIST TO AVOID CONFLICTS
DROP TABLE IF EXISTS Monster_Areas;
DROP TABLE IF EXISTS Character_Quests;
DROP TABLE IF EXISTS Character_Items;
DROP TABLE IF EXISTS Monsters;
DROP TABLE IF EXISTS Quests;
DROP TABLE IF EXISTS Areas;
DROP TABLE IF EXISTS Items;
DROP TABLE IF EXISTS Characters;

-- TABLE SECTION --

-- Characters
CREATE TABLE Characters (
    characterID INT AUTO_INCREMENT PRIMARY KEY,
    characterName VARCHAR(100) NOT NULL,
    species VARCHAR(50) NOT NULL,
    isPlayerCharacter BOOLEAN NOT NULL,
    totalExperience INT DEFAULT 0,
    currentLevel INT,
    currentHP INT,
    maxHP INT,
    armorClass INT,
    alignment VARCHAR(50),
    profBonus INT
);

-- Items
CREATE TABLE Items (
    itemID INT AUTO_INCREMENT PRIMARY KEY,
    itemName VARCHAR(50) NOT NULL UNIQUE,
    itemType VARCHAR(50),
    rarity VARCHAR(50),
    weight INT
);

-- Areas
CREATE TABLE Areas (
    areaID INT AUTO_INCREMENT PRIMARY KEY,
    areaType VARCHAR(50),
    areaName VARCHAR(50) NOT NULL UNIQUE
);

-- Quests
CREATE TABLE Quests (
    questID INT AUTO_INCREMENT PRIMARY KEY,
    questName VARCHAR(100) UNIQUE,
    questDescription TEXT,
    questLevel INT,
    areaID INT,
    FOREIGN KEY (areaID) REFERENCES Areas(areaID)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

-- Monsters
CREATE TABLE Monsters (
    monsterID INT AUTO_INCREMENT PRIMARY KEY,
    monsterName VARCHAR(50) NOT NULL UNIQUE,
    maxHP INT NOT NULL,
    challengeRating INT,
    sourceBook VARCHAR(50),
    sourcePage INT,
    experiencePoints INT
);

-- Character_Items (Intersection)
CREATE TABLE Character_Items (
    characterID INT,
    itemID INT,
    quantity INT DEFAULT 1,
    isEquipped BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (characterID, itemID),
    FOREIGN KEY (characterID) REFERENCES Characters(characterID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (itemID) REFERENCES Items(itemID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Character_Quests (Intersection)
CREATE TABLE Character_Quests (
    characterID INT,
    questID INT,
    status VARCHAR(50),
    PRIMARY KEY (characterID, questID),
    FOREIGN KEY (characterID) REFERENCES Characters(characterID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (questID) REFERENCES Quests(questID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
\
-- Monster Areas (Intersection)
CREATE TABLE Monster_Areas (
    monsterID INT,
    areaID INT,
    quantity INT DEFAULT 1,
    PRIMARY KEY (monsterID, areaID),
    FOREIGN KEY (monsterID) REFERENCES Monsters(monsterID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (areaID)
        REFERENCES Areas(areaID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- INSERT SAMPLE DATA SECTION --

-- Insert Areas
INSERT INTO Areas (areaName, areaType)
VALUES ('Silverwood Forest', 'Forest'),
('Ironhold City', 'City'),
('Storm Coast', 'Ocean'),
('Ashen Plains', 'Plains');

-- Insert Characters
INSERT INTO Characters (characterName, species, isPlayerCharacter, totalExperience, currentLevel,
 currentHP, maxHP, armorClass, alignment, profBonus)
VALUES ('Arin', 'Human', TRUE, 1500, 5, 40, 40, 16, 'Neutral Good', 3),
('Borin', 'Dwarf', TRUE, 2000, 6, 50, 50, 18, 'Lawful Neutral', 3),
('Celeste', 'Elf', TRUE, 1800, 5, 35, 35, 15, 'Chaotic Good', 3);   

-- Insert Items
INSERT INTO Items (itemName, itemType, rarity, weight)
VALUES ('Longsword', 'Weapon', 'Common', 3),
('Health Potion', 'Potion', 'Common', 1),
('Magic Ring', 'Accessory', 'Rare', 0);

-- Insert Monsters
INSERT INTO Monsters (monsterName, maxHP, challengeRating, sourceBook, sourcePage, experiencePoints)
VALUES ('Goblin', 30, 1, 'Monster Manual', 166, 200),
('Orc', 45, 2, 'Monster Manual', 246, 450),
('Dragon Wyrmling', 60, 4, 'Monster Manual', 86, 1100);

-- Insert Quests
INSERT INTO Quests
(questName, questDescription, questLevel, areaID)
VALUES ('Rescue Gnomes in Silverwood Forest', 'https://docs.google.com/document/d/1a2b3c4d5e6f7g8h9i0j', 3,
    (SELECT areaID FROM Areas WHERE areaName = 'Silverwood Forest')),
('Defend Ironhold City from Orc Attack', 'https://docs.google.com/document/d/2b3c4d5e6f7g8h9i0j1a', 5,
    (SELECT areaID FROM Areas WHERE areaName = 'Ironhold City')),
('Explore the Depths of Storm Coast', 'https://docs.google.com/document/d/3c4d5e6f7g8h9i0j1a2b', 4,
    (SELECT areaID FROM Areas WHERE areaName = 'Storm Coast'));

-- Insert Character_Items
INSERT INTO Character_Items (characterID, itemID, quantity, isEquipped)
VALUES ((SELECT characterID FROM Characters WHERE characterName = 'Arin'),
    (SELECT itemID FROM Items WHERE itemName = 'Longsword'), 1, TRUE),
((SELECT characterID FROM Characters WHERE characterName = 'Borin'),
    (SELECT itemID FROM Items WHERE itemName = 'Health Potion'), 2, FALSE),
((SELECT characterID FROM Characters WHERE characterName = 'Celeste'),
    (SELECT itemID FROM Items WHERE itemName = 'Magic Ring'), 1, TRUE);

 -- Insert Character_Quests
INSERT INTO Character_Quests (characterID, questID)
VALUES ((SELECT characterID FROM Characters WHERE characterName = 'Arin'),
    (SELECT questID FROM Quests WHERE questName = 'Rescue Gnomes in Silverwood Forest')),
((SELECT characterID FROM Characters WHERE characterName = 'Borin'),
    (SELECT questID FROM Quests WHERE questName = 'Defend Ironhold City from Orc Attack')),
((SELECT characterID FROM Characters WHERE characterName = 'Celeste'),
    (SELECT questID FROM Quests WHERE questName = 'Explore the Depths of Storm Coast'));

-- Insert Monster_Areas
INSERT INTO Monster_Areas (monsterID, areaID, quantity)
VALUES ((SELECT monsterID FROM Monsters WHERE monsterName = 'Goblin'),
    (SELECT areaID FROM Areas WHERE areaName = 'Silverwood Forest'), 10),
((SELECT monsterID FROM Monsters WHERE monsterName = 'Orc'),
    (SELECT areaID FROM Areas WHERE areaName = 'Ironhold City'), 7),
((SELECT monsterID FROM Monsters WHERE monsterName = 'Dragon Wyrmling'),
    (SELECT areaID FROM Areas WHERE areaName = 'Storm Coast'), 3);


-- END OF DDL FILE --

COMMIT;
SET AUTOCOMMIT = 1;
SET FOREIGN_KEY_CHECKS = 1;