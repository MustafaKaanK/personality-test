import React, { useState, useEffect } from 'react';

const QuestionEx = () => {
  const [temporaryColor, setTemporaryColor] = useState(null);
  const [rerenderCount, setRerenderCount] = useState(0);

  // Function to generate a random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Function to handle re-rendering
  useEffect(() => {
    const color = getRandomColor();
    setTemporaryColor(color);

    // Revert back to original color after 2000 milliseconds (2 seconds)
    const timeout = setTimeout(() => {
      setTemporaryColor(null);
    }, 2000);

    // Cleanup the timeout to prevent memory leaks
    return () => clearTimeout(timeout);
  }, [rerenderCount]);

  // Function to handle button click and trigger re-render
  const handleButtonClick = () => {
    setRerenderCount(prevCount => prevCount + 1);
  };

  return (
    <div style={{ backgroundColor: temporaryColor ? temporaryColor : 'white', padding: '50px', textAlign: 'center' }}>
      <h1>Hello React!</h1>
      <p>This component temporarily changes its background color every time it gets re-rendered.</p>
      <button onClick={handleButtonClick}>Re-render</button>
    </div>
  );
};

export default QuestionEx;
