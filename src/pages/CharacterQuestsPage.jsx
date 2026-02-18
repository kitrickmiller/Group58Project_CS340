import React from 'react';
import EntityManager from '../components/EntityManager.jsx';

const entity = {
  key: 'character_quests',
  label: 'Character Quests',
  endpoint: 'character_quests',
  fields: [
    { 
      name: 'characterID', 
      label: 'Character', 
      type: 'select', 
      required: true,
      optionsEndpoint: 'characters',
      optionValue: 'characterID',
      optionLabel: 'characterName'
    },
    { 
      name: 'questID', 
      label: 'Quest', 
      type: 'select', 
      required: true,
      optionsEndpoint: 'quests',
      optionValue: 'questID',
      optionLabel: 'questName'
    },
    { name: 'status', label: 'Status', type: 'text', required: true }
  ],
  displayFields: [
    { name: 'characterID', label: 'Character ID' },
    { name: 'characterName', label: 'Character Name' },
    { name: 'questID', label: 'Quest ID' },
    { name: 'questName', label: 'Quest Name' },
    { name: 'status', label: 'Status' }
  ]
};

export default function CharacterQuestsPage() {
  return <EntityManager entity={entity} />;
}
