import styled from "styled-components";
const DiceSection = styled.section`
  display: flex;
  gap: 2rem;
  justify-content: center;
  padding: 0.5rem;
`;
const Dice = styled.div`
  height: 4rem;
  width: 4rem;
  background-size: cover;
  border-radius: 0.5rem;
  background-image: url(${(props) => props.imgSrc});
`;
/*
props:{quantity:number,diceResults:array of nums 1->6 with length of dicesPlaying, initialized to [6,6,...6],show:boolean,}
*/

export default function Dices(props) {
  return (
    <DiceSection>
      {props.diceResults.map((num, i) => (
        <Dice key={i} imgSrc={`pics/dice-${num}.png`} />
      ))}
    </DiceSection>
  );
}
