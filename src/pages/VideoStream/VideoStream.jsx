import React from 'react';
import styles from './VideoStream.module.css';

const VideoStream = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Multimedia</h2>
          <div>
            <button className={styles.record}>🔴 Record</button>
            <button className={styles.capture}>📸 Capture</button>
          </div>
        </div>
        <div className={styles.video}>
          <div className={styles.noSignal}>
            <p>📷 No video signal</p>
          </div>
        </div>
      </div>

      {/* This is now outside the container */}
      <div className={styles.controlsBottomRight}>
        <button className={styles.controlButton}>⌨️ Keyboard</button>
        <button className={styles.controlButton}>🖱️ Mouse</button>
      </div>
    </>
  );
};

export default VideoStream;
