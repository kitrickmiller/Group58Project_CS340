import React from 'react';
import EntityManager from '../components/EntityManager.jsx';
import entities from '../data/entitiesConfig';

export default function QuestsPage() {
  const entity = entities.find(e => e.key === 'quests');
  return <EntityManager entity={entity} />;
}
