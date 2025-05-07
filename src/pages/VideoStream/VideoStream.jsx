import React from 'react';
import {
  CircleDot,
  Camera,
  Keyboard,
  Mouse
} from 'lucide-react';
import styles from './VideoStream.module.css';

const VideoStream = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>VirtualDesk</h2>
          <div>
            <button className={styles.record}>
              <CircleDot size={16} style={{ marginRight: '5px', color: 'red' }} />
              Record
            </button>
            <button className={styles.capture}>
              <Camera size={16} style={{ marginRight: '5px' }} />
              Capture
            </button>
          </div>
        </div>
        <div className={styles.video}>
          <div className={styles.noSignal}>
            <p>
              <Camera size={16} style={{ marginRight: '5px' }} />
              No video signal
            </p>
          </div>
        </div>
      </div>

      {/* Controls bottom right */}
      <div className={styles.controlsBottomRight}>
        <button className={styles.controlButton}>
          <Keyboard size={16} style={{ marginRight: '5px' }} />
          Keyboard
        </button>
        <button className={styles.controlButton}>
          <Mouse size={16} style={{ marginRight: '5px' }} />
          Mouse
        </button>
      </div>
    </>
  );
};

export default VideoStream;
