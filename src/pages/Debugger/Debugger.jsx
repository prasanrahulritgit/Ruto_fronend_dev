import React from 'react';

const Debugger = () => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
    
      <iframe
        src="http://100.69.116.101:7417/"
        title="Debugger"
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
    </div>
  );
};

export default Debugger;
