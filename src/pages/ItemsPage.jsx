import React from 'react';
import EntityManager from '../components/EntityManager.jsx';
import entities from '../data/entitiesConfig';

export default function ItemsPage() {
  const entity = entities.find(e => e.key === 'items');
  return <EntityManager entity={entity} />;
}
