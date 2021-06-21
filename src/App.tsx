import React from 'react';

import { Button } from './components/Button';

import './services/firebase';

const App: React.FC = () => {
  return (
    <div>
      <h1>Hello World</h1>

      <Button />
    </div>
  );
};

export default App;
