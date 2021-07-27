import classes from "./BackDrop.module.scss";

const BackDrop: React.FC = ({ children }) => {
  return <div className={classes.BackDrop}>{children}</div>;
};

export default BackDrop;
