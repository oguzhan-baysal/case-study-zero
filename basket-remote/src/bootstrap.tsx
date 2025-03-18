import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Basket from './components/Basket';
import { Providers } from './store/provider';

export const mount = () => {
  const container = document.getElementById('root');
  if (!container) throw new Error('Failed to find the root element');

  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <Providers>
        <Basket />
      </Providers>
    </React.StrictMode>
  );
};