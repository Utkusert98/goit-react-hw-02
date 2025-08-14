import styles from "./Options.module.css";

function Options({ onFeedback, total, onReset }) {
  return (
    <div className={styles.buttons}>
      <button onClick={() => onFeedback("good")}>Good</button>
      <button onClick={() => onFeedback("neutral")}>Neutral</button>
      <button onClick={() => onFeedback("bad")}>Bad</button>
      {total > 0 && <button onClick={onReset}>Reset</button>}
    </div>
  );
}

export default Options;
