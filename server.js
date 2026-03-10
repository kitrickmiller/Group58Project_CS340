// AI Citation: AI was not used for the creation of this file.

const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./db-connector');

const app = express();
app.use(cors({ credentials: true, origin: '*' }));
app.use(express.json());

const pool = db;
const MY_ONID = 'millekit';

// Validation function to check for negative numeric values
function validateNoNegatives(data) {
  for (const [key, value] of Object.entries(data)) {
    if (value !== null && value !== undefined && value !== '') {
      const num = Number(value);
      if (!isNaN(num) && num < 0) {
        throw new Error(`${key} cannot be negative. Value: ${value}`);
      }
    }
  }
}

async function callProcedure(statement, params = []) {
  await pool.query(statement, params);
}

app.get('/', async (req, res) => {
  try {
    const query1 = 'DROP TABLE IF EXISTS diagnostic;';
    const query2 = 'CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);';
    const query3 = `INSERT INTO diagnostic (text) VALUES ("MySQL and React is working for ${MY_ONID}!")`;
    const query4 = 'SELECT * FROM diagnostic;';

    await pool.query(query1);
    await pool.query(query2);
    await pool.query(query3);

    const [rows] = await pool.query(query4);
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error executing diagnostic queries:', err);
    res.status(500).send('An error occurred while executing the database queries.');
  }
});

// CHARACTERS
app.get('/api/characters', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Characters');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/characters', async (req, res) => {
  const { characterName, species, isPlayerCharacter, totalExperience, currentLevel, currentHP, maxHP, armorClass, alignment, profBonus } = req.body;
  try {
    validateNoNegatives(req.body);
    await callProcedure(
      'CALL Characters_Insert(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [characterName, species, isPlayerCharacter, totalExperience, currentLevel, currentHP, maxHP, armorClass, alignment, profBonus]
    );
    res.json({ success: true, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/characters/:id', async (req, res) => {
  const { id } = req.params;
  const { characterName, species, isPlayerCharacter, totalExperience, currentLevel, currentHP, maxHP, armorClass, alignment, profBonus } = req.body;
  try {
    validateNoNegatives(req.body);
    await callProcedure(
      'CALL Characters_Update(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, characterName, species, isPlayerCharacter, totalExperience, currentLevel, currentHP, maxHP, armorClass, alignment, profBonus]
    );
    res.json({ id, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/characters/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await callProcedure('CALL Characters_Delete(?)', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ITEMS
app.get('/api/items', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Items');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/items', async (req, res) => {
  const { itemName, itemType, rarity, weight } = req.body;
  try {
    validateNoNegatives(req.body);
    await callProcedure(
      'CALL Items_Insert(?, ?, ?, ?)',
      [itemName, itemType, rarity, weight]
    );
    res.json({ success: true, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  const { itemName, itemType, rarity, weight } = req.body;
  try {
    validateNoNegatives(req.body);
    await callProcedure(
      'CALL Items_Update(?, ?, ?, ?, ?)',
      [id, itemName, itemType, rarity, weight]
    );
    res.json({ id, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await callProcedure('CALL Items_Delete(?)', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// AREAS
app.get('/api/areas', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Areas');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/areas', async (req, res) => {
  const { areaType, areaName } = req.body;
  try {
    await callProcedure(
      'CALL Areas_Insert(?, ?)',
      [areaType, areaName]
    );
    res.json({ success: true, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/areas/:id', async (req, res) => {
  const { id } = req.params;
  const { areaType, areaName } = req.body;
  try {
    await callProcedure(
      'CALL Areas_Update(?, ?, ?)',
      [id, areaType, areaName]
    );
    res.json({ id, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/areas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await callProcedure('CALL Areas_Delete(?)', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// QUESTS
app.get('/api/quests', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT q.questID, q.questName, q.questDescription, q.questLevel, q.areaID,
             a.areaName
      FROM Quests q
      LEFT JOIN Areas a ON q.areaID = a.areaID
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/quests', async (req, res) => {
  const { questName, questDescription, questLevel, areaID } = req.body;
  try {
    validateNoNegatives(req.body);
    await callProcedure(
      'CALL Quests_Insert(?, ?, ?, ?)',
      [questName, questDescription, questLevel, areaID]
    );
    res.json({ success: true, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/quests/:id', async (req, res) => {
  const { id } = req.params;
  const { questName, questDescription, questLevel, areaID } = req.body;
  try {
    validateNoNegatives(req.body);
    await callProcedure(
      'CALL Quests_Update(?, ?, ?, ?, ?)',
      [id, questName, questDescription, questLevel, areaID]
    );
    res.json({ id, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/quests/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await callProcedure('CALL Quests_Delete(?)', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// MONSTERS
app.get('/api/monsters', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Monsters');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/monsters', async (req, res) => {
  const { monsterName, maxHP, challengeRating, sourceBook, sourcePage, experiencePoints } = req.body;
  try {
    validateNoNegatives(req.body);
    await callProcedure(
      'CALL Monsters_Insert(?, ?, ?, ?, ?, ?)',
      [monsterName, maxHP, challengeRating, sourceBook, sourcePage, experiencePoints]
    );
    res.json({ success: true, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/monsters/:id', async (req, res) => {
  const { id } = req.params;
  const { monsterName, maxHP, challengeRating, sourceBook, sourcePage, experiencePoints } = req.body;
  try {
    validateNoNegatives(req.body);
    await callProcedure(
      'CALL Monsters_Update(?, ?, ?, ?, ?, ?, ?)',
      [id, monsterName, maxHP, challengeRating, sourceBook, sourcePage, experiencePoints]
    );
    res.json({ id, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/monsters/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await callProcedure('CALL Monsters_Delete(?)', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CHARACTER_ITEMS
app.get('/api/character_items', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT ci.characterID, ci.itemID, ci.quantity, ci.isEquipped,
             c.characterName, i.itemName
      FROM Character_Items ci
      JOIN Characters c ON ci.characterID = c.characterID
      JOIN Items i ON ci.itemID = i.itemID
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/character_items', async (req, res) => {
  const { characterID, itemID, quantity, isEquipped } = req.body;
  try {
    validateNoNegatives(req.body);
    await callProcedure(
      'CALL CharacterItems_Insert(?, ?, ?, ?)',
      [characterID, itemID, quantity, isEquipped]
    );
    res.json(req.body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/character_items/:characterID/:itemID', async (req, res) => {
  const { characterID, itemID } = req.params;
  const { characterID: newCharacterID, itemID: newItemID, quantity, isEquipped } = req.body;
  try {
    validateNoNegatives(req.body);
    await callProcedure(
      'CALL CharacterItems_Update(?, ?, ?, ?, ?, ?)',
      [characterID, itemID, newCharacterID, newItemID, quantity, isEquipped]
    );
    res.json(req.body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/character_items/:characterID/:itemID', async (req, res) => {
  const { characterID, itemID } = req.params;
  try {
    await callProcedure('CALL CharacterItems_Delete(?, ?)', [characterID, itemID]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CHARACTER_QUESTS
app.get('/api/character_quests', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT cq.characterID, cq.questID, cq.status,
             c.characterName, q.questName
      FROM Character_Quests cq
      JOIN Characters c ON cq.characterID = c.characterID
      JOIN Quests q ON cq.questID = q.questID
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/character_quests', async (req, res) => {
  const { characterID, questID, status } = req.body;
  try {
    await callProcedure(
      'CALL CharacterQuests_Insert(?, ?, ?)',
      [characterID, questID, status]
    );
    res.json(req.body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/character_quests/:characterID/:questID', async (req, res) => {
  const { characterID, questID } = req.params;
  const { characterID: newCharacterID, questID: newQuestID, status } = req.body;
  try {
    await callProcedure(
      'CALL CharacterQuests_Update(?, ?, ?, ?, ?)',
      [characterID, questID, newCharacterID, newQuestID, status]
    );
    res.json(req.body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/character_quests/:characterID/:questID', async (req, res) => {
  const { characterID, questID } = req.params;
  try {
    await callProcedure('CALL CharacterQuests_Delete(?, ?)', [characterID, questID]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// MONSTER_AREAS
app.get('/api/monster_areas', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT ma.monsterID, ma.areaID, ma.quantity,
             m.monsterName, a.areaName
      FROM Monster_Areas ma
      JOIN Monsters m ON ma.monsterID = m.monsterID
      JOIN Areas a ON ma.areaID = a.areaID
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/monster_areas', async (req, res) => {
  const { monsterID, areaID, quantity } = req.body;
  try {
    validateNoNegatives(req.body);
    await callProcedure(
      'CALL MonsterAreas_Insert(?, ?, ?)',
      [monsterID, areaID, quantity]
    );
    res.json(req.body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/monster_areas/:monsterID/:areaID', async (req, res) => {
  const { monsterID, areaID } = req.params;
  const { monsterID: newMonsterID, areaID: newAreaID, quantity } = req.body;
  try {
    validateNoNegatives(req.body);
    await callProcedure(
      'CALL MonsterAreas_Update(?, ?, ?, ?, ?)',
      [monsterID, areaID, newMonsterID, newAreaID, quantity]
    );
    res.json(req.body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/monster_areas/:monsterID/:areaID', async (req, res) => {
  const { monsterID, areaID } = req.params;
  try {
    await callProcedure('CALL MonsterAreas_Delete(?, ?)', [monsterID, areaID]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// RESET / DEMO PROCEDURE ROUTES
async function runProcedure(req, res, callStatement) {
  try {
    await pool.query(callStatement);
    res.json({ success: true, procedure: callStatement });
  } catch (error) {
    console.error('Error executing stored procedure:', error);
    res.status(500).json({ error: 'An error occurred while executing the stored procedure.' });
  }
}

app.get('/api/demo/delete-arin', async (req, res) => runProcedure(req, res, 'CALL DemoDeleteArin();'));
app.post('/api/demo/delete-arin', async (req, res) => runProcedure(req, res, 'CALL DemoDeleteArin();'));

app.get('/api/demo/reset-db', async (req, res) => runProcedure(req, res, 'CALL ResetToDDLState();'));
app.post('/api/demo/reset-db', async (req, res) => runProcedure(req, res, 'CALL ResetToDDLState();'));

const PORT = 53261;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
