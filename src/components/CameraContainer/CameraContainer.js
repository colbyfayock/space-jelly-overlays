import React from 'react';
import { FaTwitter } from 'react-icons/fa';

import styles from './CameraContainer.module.scss';

export default function CameraContainer({ className, guest, size = 'medium', span = 1 }) {
  let cameraContainerClassName = styles.CameraContainer;

  if ( className ) {
    cameraContainerClassName = `${cameraContainerClassName} ${className}`;
  }

  return (
    <div className={cameraContainerClassName} data-size={size} data-span={span}>
      <div className={styles.CameraContainerCamera} />
      <p className={styles.CameraContainerLabel}>{guest.twitter}</p>
    </div>
  );
}
