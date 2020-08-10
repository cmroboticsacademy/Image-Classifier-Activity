import React from 'react';

import './CheckBox.css';

const CheckBox = ({ label, onChange }) => {
  return (
    <label className="fancy-checkbox">
      {label}
      <input type="checkbox" onChange={onChange} />
      <span className="fancy-checkbox__checkmark"></span>
    </label>
  );
};

export default CheckBox;
