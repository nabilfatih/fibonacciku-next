import styles from "./bar.module.scss";

export const Bar = ({ animationDuration, progress }) => {
  return (
    <div
      className={styles.bar}
      style={{
        marginLeft: `${(-1 + progress) * 100}%`,
        transition: `margin-left ${animationDuration}ms linear`,
      }}
    ></div>
  );
};
