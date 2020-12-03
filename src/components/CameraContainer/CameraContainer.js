import React from 'react';
import { FaTwitter } from 'react-icons/fa';

import styles from './CameraContainer.module.scss';

export default function CameraContainer({ guest, span = 1 }) {
  return (
    <div className={styles.CameraContainer} data-span={span}>
      <div className={styles.CameraContainerCamera} />
      <p className={styles.CameraContainerLabel}>{guest.twitter}</p>
    </div>
  );
}
