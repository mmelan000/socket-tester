import TeamCard from './TeamCard';

export default function TeamCardContainer(props) {
  let teamCards = [
    <TeamCard team='1' key='1' />,
    <TeamCard team='2' key='2' />,
  ];
  if (props.teams === 3) {
    teamCards.push(<TeamCard team='3' key='3' />);
  }

  return <div className='team-card-container'>{teamCards}</div>;
}
