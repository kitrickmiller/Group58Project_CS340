const entities = [
  {
    key: 'characters',
    label: 'Characters',
    endpoint: 'characters',
    idField: 'characterID',
    fields: [
      { name: 'characterName', label: 'Name', type: 'text', required: true },
      { name: 'species', label: 'Species', type: 'text' },
      { name: 'isPlayerCharacter', label: 'Player Character', type: 'checkbox' },
      { name: 'totalExperience', label: 'Total Experience', type: 'number' },
      { name: 'currentLevel', label: 'Current Level', type: 'number' },
      { name: 'currentHP', label: 'Current HP', type: 'number' },
      { name: 'maxHP', label: 'Max HP', type: 'number' },
      { name: 'armorClass', label: 'Armor Class', type: 'number' },
      { name: 'alignment', label: 'Alignment', type: 'text' },
      { name: 'profBonus', label: 'Proficiency Bonus', type: 'number' }
    ],
    displayFields: [
      { name: 'characterID', label: 'ID' },
      { name: 'characterName', label: 'Name' },
      { name: 'species', label: 'Species' },
      { name: 'isPlayerCharacter', label: 'Player Character' },
      { name: 'totalExperience', label: 'Total Experience' },
      { name: 'currentLevel', label: 'Current Level' },
      { name: 'currentHP', label: 'Current HP' },
      { name: 'maxHP', label: 'Max HP' },
      { name: 'armorClass', label: 'Armor Class' },
      { name: 'alignment', label: 'Alignment' },
      { name: 'profBonus', label: 'Proficiency Bonus' }
    ]
  },
  {
    key: 'items',
    label: 'Items',
    endpoint: 'items',
    idField: 'itemID',
    fields: [
      { name: 'itemName', label: 'Name', type: 'text', required: true },
      { name: 'itemType', label: 'Type', type: 'text' },
      { name: 'rarity', label: 'Rarity', type: 'text' },
      { name: 'weight', label: 'Weight', type: 'number' }
    ],
    displayFields: [
      { name: 'itemID', label: 'ID' },
      { name: 'itemName', label: 'Name' },
      { name: 'itemType', label: 'Type' },
      { name: 'rarity', label: 'Rarity' },
      { name: 'weight', label: 'Weight' }
    ]
  },
  {
    key: 'quests',
    label: 'Quests',
    endpoint: 'quests',
    idField: 'questID',
    fields: [
      { name: 'questName', label: 'Name', type: 'text', required: true },
      { name: 'questDescription', label: 'Description / URL', type: 'text' },
      { name: 'questLevel', label: 'Suggested Level', type: 'number' },
      { name: 'areaID', label: 'Area ID', type: 'number' }
    ],
    displayFields: [
      { name: 'questID', label: 'ID' },
      { name: 'questName', label: 'Name' },
      { name: 'questDescription', label: 'Description / URL' },
      { name: 'questLevel', label: 'Suggested Level' },
      { name: 'areaID', label: 'Area ID' }
    ]
  },
  {
    key: 'areas',
    label: 'Areas',
    endpoint: 'areas',
    idField: 'areaID',
    fields: [
      { name: 'areaType', label: 'Type', type: 'text' },
      { name: 'areaName', label: 'Name', type: 'text', required: true }
    ],
    displayFields: [
      { name: 'areaID', label: 'ID' },
      { name: 'areaType', label: 'Type' },
      { name: 'areaName', label: 'Name' }
    ]
  },
  {
    key: 'monsters',
    label: 'Monsters',
    endpoint: 'monsters',
    idField: 'monsterID',
    fields: [
      { name: 'monsterName', label: 'Name', type: 'text', required: true },
      { name: 'maxHP', label: 'Max HP', type: 'number' },
      { name: 'challengeRating', label: 'Challenge Rating', type: 'number' },
      { name: 'sourceBook', label: 'Source Book', type: 'text' },
      { name: 'sourcePage', label: 'Source Page', type: 'number' },
      { name: 'experiencePoints', label: 'XP', type: 'number' }
    ],
    displayFields: [
      { name: 'monsterID', label: 'ID' },
      { name: 'monsterName', label: 'Name' },
      { name: 'maxHP', label: 'Max HP' },
      { name: 'challengeRating', label: 'Challenge Rating' },
      { name: 'sourceBook', label: 'Source Book' },
      { name: 'sourcePage', label: 'Source Page' },
      { name: 'experiencePoints', label: 'XP' }
    ]
  }
];

export default entities;
