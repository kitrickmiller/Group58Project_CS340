// Page component for managing Monster Areas in the Dungeon Master Companion app.
// Uses the EntityManager component to display and manage monster area data based on a defined entity configuration.

import React from 'react';
import EntityManager from '../components/EntityManager.jsx';

const entity = {
  key: 'monster_areas',
  label: 'Monster Areas',
  endpoint: 'monster_areas',
  fields: [
    { 
      name: 'monsterID', 
      label: 'Monster', 
      type: 'select', 
      required: true,
      optionsEndpoint: 'monsters',
      optionValue: 'monsterID',
      optionLabel: 'monsterName'
    },
    { 
      name: 'areaID', 
      label: 'Area', 
      type: 'select', 
      required: true,
      optionsEndpoint: 'areas',
      optionValue: 'areaID',
      optionLabel: 'areaName'
    },
    { name: 'quantity', label: 'Quantity', type: 'number', required: true }
  ],
  displayFields: [
    { name: 'monsterID', label: 'Monster ID' },
    { name: 'monsterName', label: 'Monster Name' },
    { name: 'areaID', label: 'Area ID' },
    { name: 'areaName', label: 'Area Name' },
    { name: 'quantity', label: 'Quantity' }
  ]
};

export default function MonsterAreasPage() {
  return <EntityManager entity={entity} />;
}
