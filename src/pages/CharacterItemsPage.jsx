// Page component for managing Character Items in the Dungeon Master Companion app.
// Uses the EntityManager component to display and manage character item data based on the defined entity configuration.

import React from 'react';
import EntityManager from '../components/EntityManager.jsx';

const entity = {
  key: 'character_items',
  label: 'Character Items',
  endpoint: 'character_items',
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
      name: 'itemID', 
      label: 'Item', 
      type: 'select', 
      required: true,
      optionsEndpoint: 'items',
      optionValue: 'itemID',
      optionLabel: 'itemName'
    },
    { name: 'quantity', label: 'Quantity', type: 'number', required: true },
    { name: 'isEquipped', label: 'Is Equipped', type: 'checkbox' }
  ],
  displayFields: [
    { name: 'characterID', label: 'Character ID' },
    { name: 'characterName', label: 'Character Name' },
    { name: 'itemID', label: 'Item ID' },
    { name: 'itemName', label: 'Item Name' },
    { name: 'quantity', label: 'Quantity' },
    { name: 'isEquipped', label: 'Is Equipped' }
  ]
};

export default function CharacterItemsPage() {
  return <EntityManager entity={entity} />;
}
