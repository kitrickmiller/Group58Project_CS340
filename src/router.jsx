import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import CharactersPage from './pages/CharactersPage.jsx';
import ItemsPage from './pages/ItemsPage.jsx';
import QuestsPage from './pages/QuestsPage.jsx';
import AreasPage from './pages/AreasPage.jsx';
import MonstersPage from './pages/MonstersPage.jsx';
import CharacterItemsPage from './pages/CharacterItemsPage.jsx';
import CharacterQuestsPage from './pages/CharacterQuestsPage.jsx';
import MonsterAreasPage from './pages/MonsterAreasPage.jsx';

export default function AppRouter() {
  return (
    <Router>
      <div className="app-container">
        <header className="site-header">
          <div className="brand">
            <div className="logo" aria-hidden="true" />
            <h1>Dungeon Master Companion</h1>
          </div>
          <nav className="main-nav" aria-label="Main navigation">
            <ul>
              <li><NavLink to="/" className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink></li>
              <li><NavLink to="/characters" className={({isActive}) => isActive ? 'active' : ''}>Characters</NavLink></li>
              <li><NavLink to="/items" className={({isActive}) => isActive ? 'active' : ''}>Items</NavLink></li>
              <li><NavLink to="/quests" className={({isActive}) => isActive ? 'active' : ''}>Quests</NavLink></li>
              <li><NavLink to="/areas" className={({isActive}) => isActive ? 'active' : ''}>Areas</NavLink></li>
              <li><NavLink to="/monsters" className={({isActive}) => isActive ? 'active' : ''}>Monsters</NavLink></li>
              <li><NavLink to="/character-items" className={({isActive}) => isActive ? 'active' : ''}>Character Items</NavLink></li>
              <li><NavLink to="/character-quests" className={({isActive}) => isActive ? 'active' : ''}>Character Quests</NavLink></li>
              <li><NavLink to="/monster-areas" className={({isActive}) => isActive ? 'active' : ''}>Monster Areas</NavLink></li>
            </ul>
          </nav>
        </header>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/quests" element={<QuestsPage />} />
        <Route path="/areas" element={<AreasPage />} />
        <Route path="/monsters" element={<MonstersPage />} />
        <Route path="/character-items" element={<CharacterItemsPage />} />
        <Route path="/character-quests" element={<CharacterQuestsPage />} />
        <Route path="/monster-areas" element={<MonsterAreasPage />} />
      </Routes>
      </div>
    </Router>
  );
}
