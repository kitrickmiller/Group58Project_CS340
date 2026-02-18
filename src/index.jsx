// Entry point for the Dungeon Master Companion frontend application.
// Renders the AppRouter which manages routing between different pages of the app.

import React from 'react';
import { createRoot } from 'react-dom/client';
import AppRouter from './router.jsx';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<AppRouter />);
