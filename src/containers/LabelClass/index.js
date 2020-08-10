import React from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import Header from './Header';
import ClickableImage from './ClickableImage';
import './LabelClass.css';
import { removeImage } from '../../redux/actions/labelClasses';
import { reloadExamples } from '../../shared/image_classifier';

const LabelClass = ({ id }) => {
  const dispatch = useDispatch();
  const removeExample = (index) => {
    dispatch(removeImage(labelClass.id, index)).then(
      reloadExamples(labelClass)
    );
  };

  const labelClass = useSelector((state) => {
    return _.find(state.labelClasses.list, { id });
  });

  return (

    <div className="panel--round class-panel">
      <Header labelClass={labelClass} />
      <div className="panel--round__body">
        <div className="panel--round__body___subheader">
          <label>Items: {labelClass.images.length}</label>
        </div>
        <div className="flex-row-container flex-wrap">
          { labelClass.images.map((image, index) => {
            return (
              <ClickableImage
                key={index}
                index={index}
                image={image}
                labelClass={labelClass}
                removeExample={removeExample}
              />
            );
          })}
        </div>
      </div>

    </div>

  );
};

export default LabelClass;
