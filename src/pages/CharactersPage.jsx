// Page component for managing Characters in the Dungeon Master Companion app.
// Uses the EntityManager component to display and manage character data based on the configuration defined in entitiesConfig.js.

import React from 'react';
import EntityManager from '../components/EntityManager.jsx';
import entities from '../data/entitiesConfig';

export default function CharactersPage() {
  const entity = entities.find(e => e.key === 'characters');
  return <EntityManager entity={entity} />;
}
