import React from 'react';
import styles from './VideoStream.module.css';

const VideoStream = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Video Stream</h2>
        <div>
          <button className={styles.record}>🔴 Record</button>
          <button className={styles.capture}>➕ Capture</button>
        </div>
      </div>
      <div className={styles.video}>
        <div className={styles.noSignal}>
          <p>📷 No video signal</p>
        </div>
      </div>
    </div>
  );
};

export default VideoStream;
