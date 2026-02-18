import React from 'react';
import EntityManager from '../components/EntityManager.jsx';
import entities from '../data/entitiesConfig';

export default function AreasPage() {
  const entity = entities.find(e => e.key === 'areas');
  return <EntityManager entity={entity} />;
}
