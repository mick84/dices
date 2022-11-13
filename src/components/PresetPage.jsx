import { useRef, useState } from "react";
import styled from "styled-components";

import { GameEl } from "./Game";
import Button from "./Button";

const InputBlock = styled.div`
  background-color: #ca7b99;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin: 1rem;
  padding: 0.5rem;
  & > input,
  select {
    padding: 0.25rem 1rem;
  }
`;
export default function PresetPage(props) {
  const targetScoreRef = useRef();
  const playersRef = useRef();
  const dicesRef = useRef();
  const [seq, setSeq] = useState(props.forbiddenSeq);
  const handleSubmit = (e) => {
    e.preventDefault();
    const players = Array.from(
      { length: +playersRef.current.value },
      (_, i) => ({
        totalScore: 0,
        currentScore: 0,
        lost: false,
        winner: false,
        wins: 0,
        // isPlaying: true,
        playerNum: i,
        locked: false,
      })
    );
    const updatedprops = {
      settingsMode: false,
      forbiddenSeq: seq,
      targetScore: +targetScoreRef.current.value,
      gameIsRunning: true,
      playerIndex: 0,
      diceResults: Array.from({ length: +dicesRef.current.value }, () => seq),
      players,
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
          Clicking on "Lock" you will participate without throwing dices. At the
          end, your score will be compared to other's in order to find the
          winner!
        </li>
        <li>
          Note if you get {seq} on all the dices, you will lose all the poins
          from "Current" and the turn will go to another player
        </li>
        <li>
          If you managed to reach exactly the target score, you win. If you
          reached more - you lose!
        </li>
      </ul>
      <form onSubmit={handleSubmit}>
        <InputBlock>
          <label htmlFor="seq">Choose forbidden sequence:</label>
          <select
            name="seq"
            id="seq"
            defaultValue={props.forbiddenSeq}
            onChange={(e) => setSeq(() => e.target.value)}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
          </select>
        </InputBlock>
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
            step={50}
          />
        </InputBlock>
        <Button type="submit">🏁Start!</Button>
      </form>
    </GameEl>
  );
}
