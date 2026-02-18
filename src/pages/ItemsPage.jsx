// Page component for managing Items in the Dungeon Master Companion app.
// Uses the EntityManager component to display and manage item data based on the configuration defined in entitiesConfig.js.

import React from 'react';
import EntityManager from '../components/EntityManager.jsx';
import entities from '../data/entitiesConfig';

export default function ItemsPage() {
  const entity = entities.find(e => e.key === 'items');
  return <EntityManager entity={entity} />;
}
