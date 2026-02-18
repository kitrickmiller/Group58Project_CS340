-- Sample Data for the Dungeon Master Companion

-- AREAS
INSERT INTO Areas (areaName, areaType) VALUES
  ('Silverwood Forest', 'Forest'),
  ('Ironhold City', 'City'),
  ('Storm Coast', 'Ocean'),
  ('Ashen Plains', 'Plains');

-- CHARACTERS
INSERT INTO Characters (characterName, species, isPlayerCharacter, totalExperience, currentLevel, currentHP, maxHP, armorClass, alignment, profBonus) VALUES
  ('Arin', 'Human', TRUE, 1500, 5, 40, 40, 16, 'Neutral Good', 3),
  ('Borin', 'Dwarf', TRUE, 2000, 6, 50, 50, 18, 'Lawful Neutral', 3),
  ('Celeste', 'Elf', TRUE, 1800, 5, 35, 35, 15, 'Chaotic Good', 3);

-- ITEMS
INSERT INTO Items (itemName, itemType, rarity, weight) VALUES
  ('Longsword', 'Weapon', 'Common', 3),
  ('Health Potion', 'Potion', 'Common', 1),
  ('Magic Ring', 'Accessory', 'Rare', 0);

-- MONSTERS
INSERT INTO Monsters (monsterName, maxHP, challengeRating, sourceBook, sourcePage, experiencePoints) VALUES
  ('Goblin', 30, 1, 'Monster Manual', 166, 200),
  ('Orc', 45, 2, 'Monster Manual', 246, 450),
  ('Dragon Wyrmling', 60, 4, 'Monster Manual', 86, 1100);

-- QUESTS
INSERT INTO Quests (questName, questDescription, questLevel, areaID) VALUES
  ('Rescue Gnomes in Silverwood Forest', 'https://docs.google.com/document/d/1a2b3c4d5e6f7g8h9i0j', 3, (SELECT areaID FROM Areas WHERE areaName = 'Silverwood Forest')),
  ('Defend Ironhold City from Orc Attack', 'https://docs.google.com/document/d/2b3c4d5e6f7g8h9i0j1a', 5, (SELECT areaID FROM Areas WHERE areaName = 'Ironhold City')),
  ('Explore the Depths of Storm Coast', 'https://docs.google.com/document/d/3c4d5e6f7g8h9i0j1a2b', 4, (SELECT areaID FROM Areas WHERE areaName = 'Storm Coast'));

-- CHARACTER_ITEMS
INSERT INTO Character_Items (characterID, itemID, quantity, isEquipped) VALUES
  ((SELECT characterID FROM Characters WHERE characterName = 'Arin'), (SELECT itemID FROM Items WHERE itemName = 'Longsword'), 1, TRUE),
  ((SELECT characterID FROM Characters WHERE characterName = 'Borin'), (SELECT itemID FROM Items WHERE itemName = 'Health Potion'), 2, FALSE),
  ((SELECT characterID FROM Characters WHERE characterName = 'Celeste'), (SELECT itemID FROM Items WHERE itemName = 'Magic Ring'), 1, TRUE);

-- CHARACTER_QUESTS
INSERT INTO Character_Quests (characterID, questID, status) VALUES
  ((SELECT characterID FROM Characters WHERE characterName = 'Arin'), (SELECT questID FROM Quests WHERE questName = 'Rescue Gnomes in Silverwood Forest'), 'In Progress'),
  ((SELECT characterID FROM Characters WHERE characterName = 'Borin'), (SELECT questID FROM Quests WHERE questName = 'Defend Ironhold City from Orc Attack'), 'Not Started'),
  ((SELECT characterID FROM Characters WHERE characterName = 'Celeste'), (SELECT questID FROM Quests WHERE questName = 'Explore the Depths of Storm Coast'), 'Completed');

-- MONSTER_AREAS
INSERT INTO Monster_Areas (monsterID, areaID, quantity) VALUES
  ((SELECT monsterID FROM Monsters WHERE monsterName = 'Goblin'), (SELECT areaID FROM Areas WHERE areaName = 'Silverwood Forest'), 10),
  ((SELECT monsterID FROM Monsters WHERE monsterName = 'Orc'), (SELECT areaID FROM Areas WHERE areaName = 'Ironhold City'), 7),
  ((SELECT monsterID FROM Monsters WHERE monsterName = 'Dragon Wyrmling'), (SELECT areaID FROM Areas WHERE areaName = 'Storm Coast'), 3);
