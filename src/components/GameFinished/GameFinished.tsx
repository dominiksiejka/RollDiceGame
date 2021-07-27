import BackDrop from "../../hoc/Backdrop";
import classes from "./GameFinished.module.scss";

interface GameFinishedProps {
  handleResetAllValuesToDefault(): void;
}
const GameFinished: React.FC<GameFinishedProps> = ({
  handleResetAllValuesToDefault,
}) => {
  return (
    <BackDrop>
      <section className={classes.GameFinished}>
        <p>
          The Game has finished. You can only play up to 30 rounds. All values
          will be reseted
        </p>
        <button onClick={() => handleResetAllValuesToDefault()}>ok</button>
      </section>
    </BackDrop>
  );
};

export default GameFinished;
