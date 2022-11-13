import { useState } from "react";
import styled from "styled-components";
import Controls from "./Controls";
import Dices from "./Dices";
import Player from "./Player";
import Button from "./Button";
import dicesResults from "../utils/dicesResults";
import {
  treatWinner,
  treatLoser,
  resetPlayer,
  findWinners,
} from "../utils/treatPlayer";
import circularShifted from "../utils/circularShifted";
export const GameEl = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0.5rem;
`;
const PlayersContainer = styled.div`
  display: flex;
  //justify-items: stretch;
  width: 80vw;
  gap: 0.5rem;
  padding: 0.5rem;
  background-color: #ffffff;
  border-radius: 1rem;
  overflow: hidden;
  height: 60vh;
  position: relative;
`;
const Info = styled.p`
  color: #fff27b;
  font-size: 1.5rem;
`;
const FlexCont = styled.div`
  width: 80vw;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
/* props = {
      targetScore,
      gameIsRunning: true,
      diceResults: Array<6>(playersQuantity),
      playersRemained:number=players.length
      players: Array<{
        totalScore: 0,
        currentScore: 0,
        wins: 0,
        locked:false
        isPlaying: true,
        playerNum: i,         <= i from 0 to players.length, excluding!
      }>(players.length),
      currentPlayer : players[0]
    };
   
    {
      gameisrunning,diceresults,playersRemained,players,currentPlayer
    }
*/

export default function Game(props) {
  const { gameIsRunning, diceResults, players, playerIndex } = props;
  const [state, setState] = useState({
    gameIsRunning,
    diceResults,
    players,
    playerIndex,
  });
  /*
  const playerEls = state.players.map((_, i) => (
    <Player key={i} active={i === state.playerIndex} {...state.players[i]} />
  ));
  */
  const handleRolling = () => {
    //!-------------check if there are active unlocked players!
    const diceResults = dicesResults(props.dicesPlaying);
    setState((st) => ({ ...st, diceResults }));
    if (diceResults.every((n) => n === props.forbiddenSeq)) {
      const repeated = circularShifted(state.players, state.playerIndex);
      const nextPlayer = repeated.find((el) => !el.lost && !el.locked);
      setState((st) => {
        st.players[st.playerIndex].currentScore = 0;
        st.playerIndex = nextPlayer.playerNum;
        return { ...st };
      });
      return;
    }
    const newScore = diceResults.reduce(
      (a, b) => a + b,
      state.players[state.playerIndex].currentScore
    );
    console.log(newScore, props.targetScore);
    setState((st) => {
      const player = st.players[st.playerIndex];
      player.currentScore = newScore;
      switch (true) {
        case newScore > props.targetScore:
          treatLoser(player, st);
          break;
        case newScore === props.targetScore:
          for (const p of st.players) {
            p.lost = p !== player;
            // p.isPlaying = p === player;
          }
          st.gameIsRunning = false;
          treatWinner(player, st);
          break;
        default:
          return { ...st }; //! ----------------????----------------
      }
      const otherPlaying = st.players.filter((p) => !p.lost && !p.locked);
      if (otherPlaying.length > 1) {
        st.playerIndex = otherPlaying[0].playerNum;
      } else if (otherPlaying.length === 1) {
        //otherPlaying[0].locked = true;
        //calculate max score from all not losers:
        const scoresToCompare = st.players.map((p) =>
          p.lost ? 0 : p.totalScore
        );
        const winnerScore = Math.max(scoresToCompare);
        const winners = st.players.filter((p) => p.totalScore === winnerScore);
        for (const winner of winners) {
          treatWinner(winner, st);
        }
        //treatWinner(otherPlaying[0], state);
      }
      return { ...st };
    });
  };
  const handleHold = (lock) => {
    //set player's current score to total score
    setState((st) => {
      const player = st.players[st.playerIndex];
      player.totalScore += player.currentScore;
      player.currentScore = 0;
      player.locked = lock;
      const repeated = circularShifted(st.players, st.playerIndex);
      const nextPlayer = repeated.find((p) => !p.lost && !p.locked);
      if (nextPlayer) {
        st.playerIndex = nextPlayer.playerNum;
      } else {
        st.gameIsRunning = false;
        console.log("calculating scores...");
        const winners = findWinners(st.players);
        winners.forEach(treatWinner);
      }
      return { ...st };
    });
  };
  const handleReset = () => {
    setState((st) => {
      for (const player of st.players) {
        resetPlayer(player, true);
      }
      st.playerIndex = 0;
      st.gameIsRunning = true;
      return { ...st };
    });
  };
  return (
    <GameEl>
      <FlexCont>
        <Info>Forbidden: all {props.forbiddenSeq}</Info>
        <Dices
          quantity={state.dicesPlaying}
          diceResults={state.diceResults}
        ></Dices>
        <Info>Target Score: {props.targetScore}</Info>
      </FlexCont>
      <PlayersContainer>
        {state.players.map((_, i) => (
          <Player
            key={i}
            active={state.gameIsRunning && i === state.playerIndex}
            {...state.players[i]}
          />
        ))}
      </PlayersContainer>
      <Controls>
        <Button onClick={handleReset}>🔄 New game</Button>
        <Button onClick={handleRolling} disabled={!state.gameIsRunning}>
          🎲 Roll
        </Button>
        <Button
          onClick={handleHold.bind(null, false)}
          disabled={
            !state.gameIsRunning ||
            state.players[state.playerIndex].currentScore === 0
          }
        >
          📥 Hold
        </Button>
        <Button
          onClick={handleHold.bind(null, true)}
          disabled={
            !state.gameIsRunning || state.players[state.playerIndex].locked
          }
        >
          🔒Lock
        </Button>
        <Button onClick={props.gotoSettings}>⚙️ Settings</Button>
      </Controls>
    </GameEl>
  );
}
