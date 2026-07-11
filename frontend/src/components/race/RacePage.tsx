import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GameView from '../Game';

/**
 * The Midnight Road (/race): the synthwave portfolio racer as a first-class
 * view. Drive the loop, find all the project zones, follow their links.
 */
const RacePage: React.FC = () => {
  const navigate = useNavigate();

  // Suppress the cyberpunk chrome (scanline/grids) behind the game portal.
  useEffect(() => {
    document.body.classList.add('view-scene');
    return () => {
      document.body.classList.remove('view-scene');
    };
  }, []);

  return <GameView onExit={() => navigate('/')} />;
};

export default RacePage;
