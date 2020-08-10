import React from 'react';

const Select = ({ id, onChange, value, children }) => {
  return (
    <select id={id} className="fancy-select" value={value} onChange={onChange}>
      {children}
    </select>
  );
};

export default Select;
