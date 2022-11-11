import styled from "styled-components";

const PlayerTitle = styled.p`
  color: #2bd6ba;
  font-size: 2rem;
`;
const PlayerScore = styled.p`
  font-size: 3rem;
  color: #9696d3;
`;
const Current = styled.div`
  font-size: 1.5rem;
  color: #38b8d8;
  background-color: #992d44;
  border-radius: 0.5rem;
  width: fit-content;
  padding: 1rem;
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
`;
const PlayerSec = styled.section`
  padding: 0.5rem;
  background-color: #c46464;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  &.active {
    filter: brightness(1.5);
  }
`;
export default function Player(props) {
  //console.log(props);
  return (
    <PlayerSec className={props.active && "active"}>
      <Header>
        <PlayerTitle>Player {props.playerNum}</PlayerTitle>
        <PlayerScore>{props.totalScore}</PlayerScore>
      </Header>
      <Current>
        <p>Current</p>
        <p>{props.currentScore}</p>
      </Current>
    </PlayerSec>
  );
}
