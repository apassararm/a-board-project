import styles from './loading.module.css'

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.progress}>
        <div className={styles.color}></div>
      </div>
    </div>
  );
};

export default Loading;
