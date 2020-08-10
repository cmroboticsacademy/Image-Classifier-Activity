import React from 'react';

const Image = (index, key) => {
  return (
    <img
      key={key}
      src={`/images/Item_02_Damaged/Item__${index + 1}.jpg`}
      width="128"
      height="128"
      alt={`sample ${index}`}
    />
  );
};

export default Image;
