import classes from "./GameInfo.module.scss";
import { DiceHistory } from "../../rootComponent/App";
interface GameInfoProps {
  currentScore: number;
  currentRound: number;
  maxRounds: number;
  gameHistory: DiceHistory[];
}

const GameInfo: React.FC<GameInfoProps> = ({
  currentRound,
  currentScore,
  maxRounds,
  gameHistory,
}) => {
  const handleCalculateRoundsLeft = (): number => {
    const roundsLeft = maxRounds - currentRound;
    return roundsLeft < 0 ? 0 : roundsLeft;
  };
  const handleCalculatePercentageOfWins = (): string => {
    const playedRounds = currentRound - 1;
    const numberofWins = gameHistory.filter(
      (itm) => itm.score === "won"
    ).length;
    const winsPercentage = (numberofWins / playedRounds) * 100;
    if (isNaN(winsPercentage)) {
      return "0";
    }
    return `${winsPercentage.toFixed()}%`;
  };
  return (
    <section className={classes.GameInfo}>
      <p>
        Your Score:{" "}
        <span className={classes.highlight}>
          {currentScore.toString().length === 1
            ? currentScore
            : currentScore.toFixed(1)}
        </span>
      </p>
      <p>
        Current Round:{" "}
        <span className={classes.highlight}>
          {currentRound > 30 ? "30" : currentRound}
        </span>
      </p>
      <p>
        Rounds Left:{" "}
        <span className={classes.highlight}>{handleCalculateRoundsLeft()}</span>
      </p>
      <p>
        Total wins:{" "}
        <span className={classes.highlight}>
          {handleCalculatePercentageOfWins()}
        </span>
      </p>
    </section>
  );
};

export default GameInfo;
