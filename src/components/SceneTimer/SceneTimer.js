import { useRef, useState, useEffect } from 'react';

import styles from './SceneTimer.module.scss';

const TIME_TO_COUNT = 1000 * 60 * 60;

const SceneTimer = () => {
  const startTimeRef = useRef(Date.now());
  const [timeLeft, setTimeLeft] = useState(TIME_TO_COUNT);

  const secondsLeft = Math.floor(timeLeft / 1000);

  useEffect(() => {
    const interval = setInterval(() => {
      const endTime = startTimeRef.current + TIME_TO_COUNT;
      const timeToEnd = endTime - Date.now();
      setTimeLeft(timeToEnd);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.sceneTimer}>
      <div className={styles.sceneTimerTime}>
        {Math.floor(secondsLeft / 60)}m {Math.ceil(secondsLeft % 60)}s
      </div>
    </div>
  );
};

export default SceneTimer;
