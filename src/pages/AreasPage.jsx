// Page component for managing Areas in the Dungeon Master Companion app.
// Uses the EntityManager component to display and manage area data based on the configuration defined in entitiesConfig.js.

import React from 'react';
import EntityManager from '../components/EntityManager.jsx';
import entities from '../data/entitiesConfig';

export default function AreasPage() {
  const entity = entities.find(e => e.key === 'areas');
  return <EntityManager entity={entity} />;
}
