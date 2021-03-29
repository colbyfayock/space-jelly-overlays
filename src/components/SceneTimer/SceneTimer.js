import { useRef, useState, useEffect } from 'react';
import useSound from 'use-sound';

import styles from './SceneTimer.module.scss';

import warpbangSfx from '@audio/warpbang.mp3';
import distressBeaconSfx from '@audio/distressbeacon.mp3';
import doomSfx from '@audio/doom.mp3';
import turboliftSfx from '@audio/turbolift.mp3';
import triumphSfx from '@audio/triumph.mp3';
import romComputerBeepSfx from '@audio/romulan_computerbeep.mp3';
import tensionSfx from '@audio/tension.mp3';

const TIME_TO_COUNT = 1000 * 60 * 60;

const audioSettings = { volume: 0.25 };

const SceneTimer = () => {
  const [playWarpbang] = useSound(warpbangSfx, audioSettings);
  const [playDistressBeacon] = useSound(distressBeaconSfx, audioSettings);
  const [playDoom] = useSound(doomSfx, audioSettings);
  const [playTurboLift] = useSound(turboliftSfx, audioSettings);
  const [playTriumph] = useSound(triumphSfx, audioSettings);
  const [playRomComputerBeep] = useSound(romComputerBeepSfx, audioSettings);
  const [playTension] = useSound(tensionSfx, audioSettings);

  const startTimeRef = useRef(Date.now());
  const [timeLeft, setTimeLeft] = useState(TIME_TO_COUNT);

  const secondsLeft = Math.floor(timeLeft / 1000);

  useEffect(() => {
    const socket = new WebSocket(
      'ws://space-jelly-twitch-bot.herokuapp.com/ws',
    );

    // Connection opened
    socket.addEventListener('open', function (event) {
      socket.send('Hello Server!');
    });

    // Listen for messages
    socket.addEventListener('message', function (event) {
      const { data: message } = JSON.parse(event.data);
      const { type, command, data } = message;

      if (type !== 'command') return;

      if (command === 'timeleft') {
        setTimeLeft(data.time);
      } else if (command === 'cmstart') {
        playWarpbang();
      } else if (command === 'cmadd') {
        playTurboLift();
      }
    });
  }, []);

  useEffect(() => {
    const secondsLeft = timeLeft / 1000;
    const secondsLeftFloor = Math.floor(secondsLeft);
    const minutesLeft = secondsLeftFloor / 60;
    const minutesLeftFloor = Math.floor(minutesLeft);

    const distressIntervals = [45, 30, 15];
    const tensionIntervals = [10];
    const doomIntervals = [5];

    if (secondsLeft < 1) {
      playTriumph();
      return;
    }

    if (distressIntervals.includes(minutesLeft)) {
      playDistressBeacon();
      return;
    }

    if (tensionIntervals.includes(minutesLeft)) {
      playTension();
      return;
    }

    if (doomIntervals.includes(minutesLeft)) {
      playDoom();
      return;
    }

    if (secondsLeftFloor < 11) {
      playRomComputerBeep();
      return;
    }
  }, [timeLeft]);

  return (
    <div className={styles.sceneTimer}>
      {secondsLeft > 0 && (
        <>
          <div className={styles.sceneTimerTime}>
            {Math.floor(secondsLeft / 60)}m {Math.ceil(secondsLeft % 60)}s
          </div>
          <div className={styles.sceneTimerStage}>
            <div
              className={styles.sceneTimerBar}
              style={{
                width: `${(timeLeft / TIME_TO_COUNT) * 100}%`,
              }}
            />
          </div>
        </>
      )}
      {secondsLeft <= 0 && (
        <div className={styles.sceneTimerGameOver}>
          <span>GAME OVER</span>
          <span>GAME OVER</span>
        </div>
      )}
    </div>
  );
};

export default SceneTimer;
