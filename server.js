const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./db-connector');

const app = express();
app.use(cors({ credentials: true, origin: '*' }));
app.use(express.json());

const pool = db;
const MY_ONID = 'millekit';

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
    const [result] = await pool.query(
      'INSERT INTO Characters (characterName, species, isPlayerCharacter, totalExperience, currentLevel, currentHP, maxHP, armorClass, alignment, profBonus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [characterName, species, isPlayerCharacter, totalExperience, currentLevel, currentHP, maxHP, armorClass, alignment, profBonus]
    );
    res.json({ id: result.insertId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/characters/:id', async (req, res) => {
  const { id } = req.params;
  const { characterName, species, isPlayerCharacter, totalExperience, currentLevel, currentHP, maxHP, armorClass, alignment, profBonus } = req.body;
  try {
    await pool.query(
      'UPDATE Characters SET characterName=?, species=?, isPlayerCharacter=?, totalExperience=?, currentLevel=?, currentHP=?, maxHP=?, armorClass=?, alignment=?, profBonus=? WHERE characterID=?',
      [characterName, species, isPlayerCharacter, totalExperience, currentLevel, currentHP, maxHP, armorClass, alignment, profBonus, id]
    );
    res.json({ id, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/characters/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM Characters WHERE characterID=?', [id]);
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
    const [result] = await pool.query(
      'INSERT INTO Items (itemName, itemType, rarity, weight) VALUES (?, ?, ?, ?)',
      [itemName, itemType, rarity, weight]
    );
    res.json({ id: result.insertId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  const { itemName, itemType, rarity, weight } = req.body;
  try {
    await pool.query(
      'UPDATE Items SET itemName=?, itemType=?, rarity=?, weight=? WHERE itemID=?',
      [itemName, itemType, rarity, weight, id]
    );
    res.json({ id, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM Items WHERE itemID=?', [id]);
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
    const [result] = await pool.query(
      'INSERT INTO Areas (areaType, areaName) VALUES (?, ?)',
      [areaType, areaName]
    );
    res.json({ id: result.insertId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/areas/:id', async (req, res) => {
  const { id } = req.params;
  const { areaType, areaName } = req.body;
  try {
    await pool.query(
      'UPDATE Areas SET areaType=?, areaName=? WHERE areaID=?',
      [areaType, areaName, id]
    );
    res.json({ id, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/areas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM Areas WHERE areaID=?', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// QUESTS
app.get('/api/quests', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Quests');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/quests', async (req, res) => {
  const { questName, questDescription, questLevel, areaID } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Quests (questName, questDescription, questLevel, areaID) VALUES (?, ?, ?, ?)',
      [questName, questDescription, questLevel, areaID]
    );
    res.json({ id: result.insertId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/quests/:id', async (req, res) => {
  const { id } = req.params;
  const { questName, questDescription, questLevel, areaID } = req.body;
  try {
    await pool.query(
      'UPDATE Quests SET questName=?, questDescription=?, questLevel=?, areaID=? WHERE questID=?',
      [questName, questDescription, questLevel, areaID, id]
    );
    res.json({ id, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/quests/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM Quests WHERE questID=?', [id]);
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
    const [result] = await pool.query(
      'INSERT INTO Monsters (monsterName, maxHP, challengeRating, sourceBook, sourcePage, experiencePoints) VALUES (?, ?, ?, ?, ?, ?)',
      [monsterName, maxHP, challengeRating, sourceBook, sourcePage, experiencePoints]
    );
    res.json({ id: result.insertId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/monsters/:id', async (req, res) => {
  const { id } = req.params;
  const { monsterName, maxHP, challengeRating, sourceBook, sourcePage, experiencePoints } = req.body;
  try {
    await pool.query(
      'UPDATE Monsters SET monsterName=?, maxHP=?, challengeRating=?, sourceBook=?, sourcePage=?, experiencePoints=? WHERE monsterID=?',
      [monsterName, maxHP, challengeRating, sourceBook, sourcePage, experiencePoints, id]
    );
    res.json({ id, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/monsters/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM Monsters WHERE monsterID=?', [id]);
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
    await pool.query(
      'INSERT INTO Character_Items (characterID, itemID, quantity, isEquipped) VALUES (?, ?, ?, ?)',
      [characterID, itemID, quantity, isEquipped]
    );
    res.json(req.body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/character_items/:characterID/:itemID', async (req, res) => {
  const { characterID, itemID } = req.params;
  const { quantity, isEquipped } = req.body;
  try {
    await pool.query(
      'UPDATE Character_Items SET quantity=?, isEquipped=? WHERE characterID=? AND itemID=?',
      [quantity, isEquipped, characterID, itemID]
    );
    res.json(req.body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/character_items/:characterID/:itemID', async (req, res) => {
  const { characterID, itemID } = req.params;
  try {
    await pool.query('DELETE FROM Character_Items WHERE characterID=? AND itemID=?', [characterID, itemID]);
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
    await pool.query(
      'INSERT INTO Character_Quests (characterID, questID, status) VALUES (?, ?, ?)',
      [characterID, questID, status]
    );
    res.json(req.body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/character_quests/:characterID/:questID', async (req, res) => {
  const { characterID, questID } = req.params;
  const { status } = req.body;
  try {
    await pool.query(
      'UPDATE Character_Quests SET status=? WHERE characterID=? AND questID=?',
      [status, characterID, questID]
    );
    res.json(req.body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/character_quests/:characterID/:questID', async (req, res) => {
  const { characterID, questID } = req.params;
  try {
    await pool.query('DELETE FROM Character_Quests WHERE characterID=? AND questID=?', [characterID, questID]);
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
    await pool.query(
      'INSERT INTO Monster_Areas (monsterID, areaID, quantity) VALUES (?, ?, ?)',
      [monsterID, areaID, quantity]
    );
    res.json(req.body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/monster_areas/:monsterID/:areaID', async (req, res) => {
  const { monsterID, areaID } = req.params;
  const { quantity } = req.body;
  try {
    await pool.query(
      'UPDATE Monster_Areas SET quantity=? WHERE monsterID=? AND areaID=?',
      [quantity, monsterID, areaID]
    );
    res.json(req.body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/monster_areas/:monsterID/:areaID', async (req, res) => {
  const { monsterID, areaID } = req.params;
  try {
    await pool.query('DELETE FROM Monster_Areas WHERE monsterID=? AND areaID=?', [monsterID, areaID]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 53261;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
