import React from 'react';
import { useDispatch } from 'react-redux';

import { addLabelClass } from '../../redux/actions/labelClasses';
import './AddLabelClass.css';

const AddLabelClass = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addLabelClass());
  };

  return (
    <div onClick={handleClick} className="add-class-btn panel--round">
      <b>+ Add Label Class</b>
    </div>
  );
};

export default AddLabelClass;
