import { useState, useEffect } from "react";
import Header from "../layout/Header";
import Dice from "../components/Dice/Dice";
import Buttons from "../components/Buttons/Buttons";
import GameInfo from "../components/GameInfo/GameInfo";
import GameHistory from "../components/GameHistory/GameHistory";
import ResumeGameMessage from "../components/ResumeGameMessage/ResumeGameMessage";
import GameFinished from "../components/GameFinished/GameFinished";

import "./App.scss";
export interface DiceHistory {
  round: number;
  score: "won" | "lost";
}
const App: React.FC = () => {
  const [currentScore, setCurrentScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [maxNumberOfRounds, setMaxNumberOfRounds] = useState(30);
  const [gameHistory, setGameHistory] = useState<DiceHistory[]>([]);
  const [currentDiceVal, setCurrentDiceVal] = useState(3);
  const [previousDiceVal, setPreviousDiceVal] = useState(currentDiceVal);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const handleSetLocalStorge = () => {
      const storedGameData = {
        currentScore,
        currentRound,
        maxNumberOfRounds,
        gameHistory,
        currentDiceVal,
        previousDiceVal,
      };
      localStorage.setItem("savedGame", JSON.stringify(storedGameData));
    };
    window.addEventListener("beforeunload", function () {
      handleSetLocalStorge();
    });
    return () => {
      window.removeEventListener("beforeunload", function () {
        handleSetLocalStorge();
      });
    };
  });
  useEffect(() => {
    const data = localStorage.getItem("savedGame");

    if (data) {
      setShowMessage(true);
    }
  }, []);

  const handleCurrentRound = (): void => {
    setCurrentRound((prevRound) => prevRound + 1);
  };
  const handleValidateScore = (buttonType: string, val: number): void => {
    if (currentRound <= maxNumberOfRounds) {
      if (buttonType === "higher" && val > previousDiceVal) {
        setGameHistory([...gameHistory, { round: currentRound, score: "won" }]);
        return setCurrentScore((prevScore) => prevScore + 0.1);
      } else if (buttonType === "lower" && val < previousDiceVal) {
        setGameHistory([...gameHistory, { round: currentRound, score: "won" }]);
        return setCurrentScore((prevScore) => prevScore + 0.1);
      } else {
        setGameHistory([
          ...gameHistory,
          { round: currentRound, score: "lost" },
        ]);
        return setCurrentScore((prevScore) => prevScore);
      }
    } else {
      alert("game is finished");
    }
  };
  const handleUpdateCurrentDiceVal = (
    val: number,
    buttonType: string
  ): void => {
    handleValidateScore(buttonType, val);
    setPreviousDiceVal(val);
    setCurrentDiceVal(val);
  };
  const handleLoadDataFromStorage = (): void => {
    const storedObj = JSON.parse(localStorage.getItem("savedGame")!);
    setCurrentScore(storedObj.currentScore);
    setCurrentRound(storedObj.currentRound);
    setMaxNumberOfRounds(storedObj.maxNumberOfRounds);
    setGameHistory(storedObj.gameHistory);
    setCurrentDiceVal(storedObj.currentDiceVal);
    setPreviousDiceVal(storedObj.previousDiceVal);
  };
  const handleResetAllValuesToDefault = (): void => {
    setCurrentScore(0);
    setCurrentRound(1);
    setMaxNumberOfRounds(30);
    setGameHistory([]);
    setCurrentDiceVal(3);
    setPreviousDiceVal(currentDiceVal);
    setShowMessage(false);
  };
  const handleRenderGameFinishedMessage =
    currentRound > 30 ? (
      <GameFinished
        handleResetAllValuesToDefault={handleResetAllValuesToDefault}
      />
    ) : null;
  return (
    <div>
      <Header />
      <main className='appContent'>
        <GameInfo
          maxRounds={maxNumberOfRounds}
          currentRound={currentRound}
          currentScore={currentScore}
          gameHistory={gameHistory}
        />
        <Buttons
          handleUpdateDice={handleUpdateCurrentDiceVal}
          currentRound={handleCurrentRound}
        />
        <Dice currentDiceVal={currentDiceVal} />
        {gameHistory.length !== 0 && (
          <GameHistory gameHistoryData={gameHistory} />
        )}
      </main>
      {showMessage && (
        <ResumeGameMessage
          setShowMessage={setShowMessage}
          handleLoadDataFromStorage={handleLoadDataFromStorage}
        />
      )}
      {handleRenderGameFinishedMessage}
    </div>
  );
};

export default App;
