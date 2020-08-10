import React from 'react';

import { MdAddAPhoto } from 'react-icons/md';
import './SnapShotButton.css';

const SnapShotButton = ({ handleSnapshot, disabled = false }) => {
  return (
    <button
      className="snapshot-btn"
      onClick={handleSnapshot}
      disabled={disabled}
    >
      <MdAddAPhoto className="snapshot-btn__icon" />
      <span>Add to Class</span>
    </button>
  );
};

export default SnapShotButton;
