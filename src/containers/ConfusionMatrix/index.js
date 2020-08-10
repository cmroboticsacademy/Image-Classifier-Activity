import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Quadrant from './quadrant';
import { cmQuadrantSelector } from '../../redux/reducers/inferences';
import { selectInference } from '../../redux/actions/inferences';

import './ConfusionMatrix.css';
import { ToolTip } from '../../components/Tooltip';

import _ from "lodash";
const ConfusionMatrix = () => {
  const { scores, inferences, game } = useSelector((state) => state);
  const [requestStatus, setRequestStatus] = useState(null);

  const dispatch = useDispatch();
  const selectInferenceProp = (inference) => 
    dispatch(selectInference(inference));

  const tooltipRef = useRef(null);
  useEffect(()=> {
    if (tooltipRef.current.isVisible()) {
      tooltipRef.current.hide();
    }
  }, [scores])
  return (
    <div className="confusion-matrix panel--round">
      <div className={"panel--round__header"}>
        <b>Last Batch Results</b>
      </div>

      <div className="panel--round__body">
        <div className="flex-row-container flex-justify-end">
          <div className="confusion-matrix__top__axis flex-column-container flex-justify-evenly">
            <b className="text-center">Actual Part Quality</b>
            <div className="flex-row-container flex-justify-space-around text-center">
              <label>OK</label>
              <label>DEFECT</label>
            </div>
          </div>
        </div>

        <div className="flex-row-container">
          <div className="confusion-matrix__left__axis flex-row-container flex-justify-evenly">
            <b className="no-margin vertical-lr text-center">Your Model Said:</b>
            <div className="flex-column-container flex-justify-space-around">
              <label className="vertical-lr text-center">OK</label>
              <label className="vertical-lr text-center">DEFECT</label>
            </div>
          </div>

          <div className="confusion-matrix__quadrant__container flex-row-container flex-wrap">
          <Quadrant
              inferences={cmQuadrantSelector(inferences, false, false)}
              label="Correctly Classified"
              selectInference={selectInferenceProp}
              color="palegreen"
              tooltipRef={tooltipRef}
            />
            
            <Quadrant
              inferences={cmQuadrantSelector(inferences, true, false)}
              label="Misclassified"
              selectInference={selectInferenceProp}
              color="salmon"
              tooltipRef={tooltipRef}
            />{' '}
            <Quadrant
              inferences={cmQuadrantSelector(inferences, false, true)}
              label="Misclassified"
              selectInference={selectInferenceProp}
              color="salmon"
              tooltipRef={tooltipRef}
            />
            <Quadrant
              inferences={cmQuadrantSelector(inferences, true, true)}
              label="Correctly Classified"
              selectInference={selectInferenceProp}
              color="palegreen"
              tooltipRef={tooltipRef}
            />
          </div>
          {/** THIS TOOLTIP IS FOR THE CONFUSION MATRIX ONLY. It has a special life cycle */}
          <ToolTip ref={tooltipRef} dynamicPointer={true} />
        </div>
      </div>
    </div>
  );
};

export default ConfusionMatrix;
