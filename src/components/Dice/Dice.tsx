import classes from "./Dice.module.scss";
interface DiceProps {
  currentDiceVal: number;
}
const Dice: React.FC<DiceProps> = ({ currentDiceVal }) => {
  return (
    <section className={classes.Dice}>
      <img
        src={`http://roll.diceapi.com/images/poorly-drawn/d6/${currentDiceVal}.png`}
        alt='choosen card'
      />
    </section>
  );
};

export default Dice;
