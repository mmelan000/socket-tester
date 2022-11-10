import React from 'react';

export default function DiceButton(props) {
  // console.log('DiceButton.js');
  if (props.diceRoll1 !== 0) {
    return (
      <div className='dice-roller'>
        <button onClick={props.onClick}>
          {props.diceRoll1} + {props.diceRoll2} ={' '}
          {props.diceRoll1 + props.diceRoll2}
        </button>
      </div>
    );
  } else {
    return (
      <div className='dice-roller'>
        <button onClick={props.onClick}>Roll Dice</button>
      </div>
    );
  }
}
