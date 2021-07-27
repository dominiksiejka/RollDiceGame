import BackDrop from "../../hoc/Backdrop";
import classes from "./ResumeGameMessage.module.scss";

interface ResumeGameMessageProps {
  setShowMessage(val: boolean): void;
  handleLoadDataFromStorage(): void;
}
const ResumeGameMessage: React.FC<ResumeGameMessageProps> = ({
  setShowMessage,
  handleLoadDataFromStorage,
}) => {
  const handleClearStorage = (): void => {
    localStorage.clear();
    setShowMessage(false);
  };
  const handleLoadData = () => {
    handleLoadDataFromStorage();
    setShowMessage(false);
  };
  return (
    <div className={classes.ResumeGameMessage}>
      <BackDrop>
        <section>
          <p>Would you like to resume your previous game?</p>
          <button onClick={handleLoadData}>Yes</button>
          <button onClick={handleClearStorage}>No</button>
        </section>
      </BackDrop>
    </div>
  );
};

export default ResumeGameMessage;
