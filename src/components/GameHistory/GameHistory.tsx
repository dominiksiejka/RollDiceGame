import classes from "./GameHistory.module.scss";
import { DiceHistory } from "../../rootComponent/App";
interface GameHistoryProps {
  gameHistoryData: DiceHistory[];
}
const GameHistory: React.FC<GameHistoryProps> = ({ gameHistoryData }) => {
  const renderGameHistory = gameHistoryData.map((item) => (
    <li key={item.round}>
      <p>
        Round: <span>{item.round}</span>
      </p>
      <p>
        Score: <span>{item.score}</span>
      </p>
    </li>
  ));
  return (
    <section className={classes.GameHistory}>
      <h2>Game History</h2>
      <ul>{renderGameHistory}</ul>
    </section>
  );
};

export default GameHistory;
