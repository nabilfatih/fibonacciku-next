import styles from './container.module.scss'

export const Container = ({ animationDuration, children, isFinished }) => {
  return (
    <div
      className={styles.container}
      style={{
        opacity: isFinished ? 0 : 1,
        transition: `opacity ${animationDuration}ms linear`,
      }}
    >
      {children}
    </div>
  );
};
