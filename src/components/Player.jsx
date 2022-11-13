import styled from "styled-components";
//import { useState } from "react";
const PlayerTitle = styled.p`
  color: #2bd6ba;
  font-size: 1.5rem;
`;
const PlayerScore = styled.p`
  font-size: 2rem;
  color: #9696d3;
`;
const Current = styled.div`
  font-size: 1.5rem;
  color: #38b8d8;
  background-color: #992d44;
  border-radius: 0.5rem;
  width: fit-content;
  padding: 0.5rem;
  &.winner,
  &.locked {
    height: 4rem;
    width: 5rem;
    background-size: contain;
    background-repeat: no-repeat;
    background-color: transparent;
    background-position: center;
  }
  &.winner {
    background-image: url(/pics/crown.png);
  }
  &.locked {
    background-image: url(/pics/lock.png);
  }
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
  //position: relative;
  overflow: hidden;
  &.active {
    filter: brightness(1.5);
  }
  &.lost {
    filter: brightness(0.5);
  }
`;
export default function Player(props) {
  return (
    <PlayerSec className={(props.active && "active") || (props.lost && "lost")}>
      <Header>
        <PlayerTitle>Player {props.playerNum + 1}</PlayerTitle>
        <PlayerScore>{props.totalScore}</PlayerScore>
      </Header>
      <Current
        className={(props.winner && "winner") || (props.locked && "locked")}
      >
        {!(props.winner || props.locked) && (
          <>
            <p>Current</p>
            <p>{props.currentScore}</p>
          </>
        )}
      </Current>
      <p>Wins:{props.wins} </p>
    </PlayerSec>
  );
}
