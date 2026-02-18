// Main application component for DM companion frontend. 
// Manages the selected entity type and renders the EntityManager for that type.

import React, { useState } from 'react';
import EntityManager from './components/EntityManager.jsx';
import entities from './data/entitiesConfig';

export default function App() {
  const [selected, setSelected] = useState(entities[0].key);
  const current = entities.find((e) => e.key === selected) || entities[0];

  return (
    <div className="app">
      <header>
        <h1>Dungeon Master Companion — Frontend</h1>
        <p>Design by Kitrick Miller &amp; Jacob Zastera — enter data for your campaign.</p>
      </header>

      <nav style={{ marginBottom: 12 }}>
        {entities.map((e) => (
          <button
            key={e.key}
            onClick={() => setSelected(e.key)}
            style={{ marginRight: 8, fontWeight: e.key === selected ? 'bold' : 'normal' }}
          >
            {e.label}
          </button>
        ))}
      </nav>

      <main>
        <EntityManager entity={current} />
      </main>
    </div>
  );
}
