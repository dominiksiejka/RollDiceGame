import { useState } from "react";
import axios from "axios";
import classes from "./Buttons.module.scss";

interface ButtonsProps {
  handleUpdateDice(val: number, buttonType: string): void;
  currentRound(): void;
}
const Buttons: React.FC<ButtonsProps> = ({
  handleUpdateDice,
  currentRound,
}) => {
  const [isActiveButton, setIsActiveButton] = useState(true);
  const handlePickDirection = (direction: string): any => {
    if (isActiveButton) {
      setIsActiveButton(false);
      setTimeout(() => {
        setIsActiveButton(true);
      }, 1000);
      const fetchData = async () => {
        const response = await axios.get("http://roll.diceapi.com/json/d6");
        const pickedDice = response.data.dice[0];
        handleUpdateDice(pickedDice.value, direction);
      };
      fetchData();
      currentRound();
    } else return;
  };
  return (
    <section className={classes.Buttons}>
      <h2>Pick the right direction</h2>
      <div>
        <button onClick={() => handlePickDirection("higher")}>
          Higher number
        </button>
        <button onClick={() => handlePickDirection("lower")}>
          Lower number
        </button>
      </div>
    </section>
  );
};
export default Buttons;
