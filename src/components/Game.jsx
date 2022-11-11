import { useState } from "react";
import styled from "styled-components";
import Controls from "./Controls";
import Dices from "./Dices";
import Player from "./Player";
import Button from "./Button";
import dicesResults from "../utils/dicesResults";
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
`;
/* full state for Game:{
targetScore,
gameIsRunning,
players,
diceResults:[]
dicesPlaying,
 currentPlayer,
    round,
    playersLeft}
*/
export default function Game(props) {
  const [state, setState] = useState({
    ...props,
    currentPlayer: 0,
    round: 0,
    playersLeft: props.players,
    diceResults: Array.from({ length: props.dicesPlaying }, () => 6),
  });
  const [players, setPlayers] = useState(
    Array.from({ length: state.players }, (_, i) => ({
      totalScore: 0,
      currentScore: 0,
      wins: 0,
      isPlaying: true,
      playerNum: i,
    }))
  );
  const handleRolling = () => {
    const diceResults = dicesResults(props.dicesPlaying, true);
    setState((p) => ({ ...p, diceResults }));
    if (diceResults.every((n) => n === 6)) {
      console.log("6 everywhere");
      //switch to next active player:
      const nextPlayer = players
        .concat(players)
        .slice(state.currentPlayer + 1)
        .find((el) => el.isPlaying === true);
      setPlayers((players) => {
        players[state.currentPlayer].currentScore += 10;

        return players;
      });
      setState((p) => ({ ...p, currentPlayer: nextPlayer.playerNum }));
      return;
    }
    //check if current player has more than|equal to target
  };
  return (
    <GameEl>
      <Dices
        quantity={state.dicesPlaying}
        diceResults={state.diceResults}
      ></Dices>
      <PlayersContainer>
        {players.map((_, i) => (
          <Player key={i} active={i === state.currentPlayer} {...players[i]} />
        ))}
      </PlayersContainer>
      <Controls>
        <Button>🔄 New game</Button>
        <Button onClick={handleRolling}>🎲 Roll dice</Button>
        <Button>📥 Hold</Button>
      </Controls>
    </GameEl>
  );
}
