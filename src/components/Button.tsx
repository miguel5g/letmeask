import React, { useState } from 'react';

// import { Container } from './styles';

export const Button: React.FC = () => {
  const [counter, setCounter] = useState(0);

  function increment() {
    setCounter(counter + 1);
  }

  return <button onClick={increment}>{counter}</button>;
};
