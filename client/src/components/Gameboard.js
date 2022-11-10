// gameboard goes here
import Tile from './Tile';
import React from 'react';

export default function Gameboard(props) {
  console.log('Gameboard.js');
  const mappedBoardState = Object.entries(props.board).map((e) => {
    return (
      <Tile
        tileDisplay={e[1].display}
        player={e[1].player}
        key={e[1].position}
      />
    );
  });

  return (
    <div className='Gameboard'>
      <div className='Gameboard-header'>{mappedBoardState}</div>
    </div>
  );
}
