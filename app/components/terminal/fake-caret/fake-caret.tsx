import styles from "./fake-caret.module.css";

export default function FakeCaret() {
  return (
    <div>
      <div className={styles.caret}>█</div>
    </div>
  );
}
