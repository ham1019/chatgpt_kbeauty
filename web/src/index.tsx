import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './types'; // Import types to extend Window

// Create root and render
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
