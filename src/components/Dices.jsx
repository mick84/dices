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
export default function Dices(props) {
  return (
    <DiceSection>
      {props.diceResults.map((num, i) => (
        <Dice key={i} imgSrc={`pics/dice-${num}.png`} />
      ))}
    </DiceSection>
  );
}
