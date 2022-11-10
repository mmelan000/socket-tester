const { v4: uuidv4 } = require('uuid');

export default function Gamelog(props) {
  //   console.log('Gamelog.js');
  const logs = props.log.map((e) => {
    return <li key={uuidv4()}>{e}</li>;
  });
  return (
    <div className='game-log-container'>
      <header className='game-log-header'>Game Log</header>
      <ul className='game-log'>{logs}</ul>
    </div>
  );
}
