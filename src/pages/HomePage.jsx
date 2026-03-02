import React, { useState } from 'react';

export default function HomePage() {
  const [status, setStatus] = useState('');

  const apiHost = process.env.NODE_ENV === 'production'
    ? `http://${window.location.hostname}:53261`
    : 'http://localhost:53261';

  async function runDemoAction(path, message) {
    setStatus('Working...');
    try {
      const response = await fetch(`${apiHost}${path}`, { method: 'POST' });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Request failed');
      }
      setStatus(message);
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  }

  return (
    <div>
      <h2>Welcome to the Dungeon Master Companion</h2>
      <p>Select an entity from the navigation to manage your campaign data.</p>
      <h3>RESET Operation & Demo</h3>
      <p>The following buttons allow you to perform a demo CUD operation and reset the database to its initial state.</p>
      <div>
        <button
          type="button"
          onClick={() => runDemoAction('/api/demo/delete-arin', 'Demo delete complete. Check the Characters page to verify Arin is gone.')}
        >
          Delete Character Arin (Demo CUD)
        </button>
        <button
          type="button"
          onClick={() => runDemoAction('/api/demo/reset-db', 'Database reset complete. Check the table pages to verify that data has been reset.')}
          style={{ marginLeft: 8 }}
        >
          Reset Database to Default State (DDL.SQL)
        </button>
      </div>
      {status && <p style={{ marginTop: 8 }}>{status}</p>}
    </div>
  );
}
