// AI Citation: AI was not used for the creation of this file.

import React from 'react';
import EntityManager from '../components/EntityManager.jsx';
import entities from '../data/entitiesConfig';

export default function MonstersPage() {
  const entity = entities.find(e => e.key === 'monsters');
  return <EntityManager entity={entity} />;
}
