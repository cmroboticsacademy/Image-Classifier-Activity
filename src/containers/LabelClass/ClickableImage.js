import React from 'react';

const ClickableImage = ({ index, image, labelClass, removeExample }) => {
  return (
    <span className="label-class__image" onClick={() => removeExample(index)}>
      <img

        src={`data:image/png;base64, ${image}`}
        alt={`snapshot for class id ${labelClass.id}`}
      />
    </span>
  );
};

export default ClickableImage;
