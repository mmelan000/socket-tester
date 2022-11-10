import { Player, Controls } from '@lottiefiles/react-lottie-player';
import UnclaimedBoardTile from '../images/Board/UnclaimedBoardTile.svg';
import RedBoardTile from '../images/lottieFiles/RedBoardTile.json';
import BlueBoardTile from '../images/lottieFiles/BlueBoardTile.json';
import GreenBoardTile from '../images/lottieFiles/GreenBoardTile.json';

function Tile(props) {
  let background;
  let textColor = '#ffffff';
  if (props.player === 'unclaimed') {
    background = UnclaimedBoardTile;
    textColor = '#000000';
  }
  if (props.player === 'red') {
    background = RedBoardTile;
  }
  if (props.player === 'green') {
    background = GreenBoardTile;
  }
  if (props.player === 'blue') {
    background = BlueBoardTile;
  }

  // console.log('Tile.js');
  return (
    <div className={'game-tile'} id={props.id} onClick={props.onClick}>
      <p style={{ color: textColor }}>{props.tileDisplay}</p>
      {props.player === 'unclaimed' ? (
        <img src={UnclaimedBoardTile} alt='Background Tile for GameBoard'></img>
      ) : (
        <Player autoplay keepLastFrame src={background}>
          <Controls visible={false} />
        </Player>
      )}
    </div>
  );
}

export default Tile;
