import { useRef } from "react";
import styled from "styled-components";

import { GameEl } from "./Game";
import Button from "./Button";

/*props to gameEl: {
  targetScore: 100,
  gameIsRunning: false,
  players: 2,
  dicesPlaying: 2,
  
  changePresets} */
const InputBlock = styled.div`
  background-color: #ca7b99;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin: 1rem;
  padding: 0.5rem;
  & > input,
  select {
    height: 1.5rem;
    padding: 0.25rem 1rem;
  }
`;
export default function PresetPage(props) {
  const targetScoreRef = useRef();
  const playersRef = useRef();
  const dicesRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedprops = {
      targetScore: +targetScoreRef.current.value,
      gameIsRunning: true,
      players: +playersRef.current.value,
      dicesPlaying: +dicesRef.current.value,
    };
    props.changePresets(updatedprops);
  };
  return (
    <GameEl
      style={{ flexDirection: "column", fontSize: "1.2rem", gap: "1rem" }}
    >
      <h1>Welcome to the ultimate Dice Game!</h1>
      <h2>Game Instructions:</h2>
      <ul style={{ textAlign: "start" }}>
        <li>
          In your turn - roll the dice (at least once) and accumulate the result
          in "Current"
        </li>
        <li>
          You can roll again or click "Hold" to save the points from "Current"
          and end the turn
        </li>
        <li>
          Note if you get 6 on all the dices, you will lose all the poins from
          "Current" and the turn will go to another player
        </li>
        <li>
          If you managed to reach exactly the target score, you win. If you
          reached more - you lose!
        </li>
      </ul>
      <form onSubmit={handleSubmit}>
        <InputBlock>
          <label htmlFor="players">Choose number of players:</label>
          <select
            ref={playersRef}
            name="players"
            id="players"
            defaultValue={props.players}
          >
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
        </InputBlock>
        <InputBlock>
          <label htmlFor="dices">Choose quantity of dices:</label>
          <select
            ref={dicesRef}
            name="dices"
            id="dices"
            defaultValue={props.dicesPlaying}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </InputBlock>
        <InputBlock>
          <label htmlFor="target-score">Choose the target score:</label>
          <input
            type="number"
            ref={targetScoreRef}
            name="target-score"
            id="target-score"
            defaultValue={props.targetScore}
            min={50}
            max={500}
          />
        </InputBlock>
        <Button type="submit">🏁Start!</Button>
      </form>
    </GameEl>
  );
}
