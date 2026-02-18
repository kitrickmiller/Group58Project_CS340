// Page component for managing Quests in the Dungeon Master Companion app.
// Uses the EntityManager component to display and manage quest data based on the configuration defined in entitiesConfig.js.

import React from 'react';
import EntityManager from '../components/EntityManager.jsx';
import entities from '../data/entitiesConfig';

export default function QuestsPage() {
  const entity = entities.find(e => e.key === 'quests');
  return <EntityManager entity={entity} />;
}
