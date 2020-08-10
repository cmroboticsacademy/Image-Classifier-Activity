import React, { useRef } from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';

import UnityWorld from './UnityWorld';
import './UnityLabeler.css';
import { takeSnapshot } from './unity_api';
import Select from '../../components/Select';
import SnapShotButton from '../../components/SnapShotbutton';
import { changeTargetClass } from '../../redux/actions/labelClasses';
import { ToolTip, ToolTipWrapper } from '../../components/Tooltip';
import './documentEventListeners';

const UnityLabeler = () => {
  const tooltipRef = useRef(null);
  const { list, targetClassId } = useSelector((state) => state.labelClasses);
  const dispatch = useDispatch();
  const [build, url] = [
    '001_06-25-1524',
    'https://cs2n-unity-games.s3.amazonaws.com',
  ];

  const handleSnapshot = () => {
    const labelClass = _.find(list, ['id', targetClassId]);
    takeSnapshot(targetClassId, labelClass.name);
  };

  const handleChange = (e) => {
    dispatch(changeTargetClass(parseInt(e.target.value)));
  };

  const LabelClassOptions = () => {
    return list.map((labelclass) => {
      return (
        <option value={labelclass.id} key={labelclass.id}>
          {labelclass.name}
        </option>
      );
    });
  };

  return (
    <div className="unity-labeler panel--round">
      <div className="panel--round__header">
        <b>Snapshot</b>
        <br />
        Select object from Matrix
      </div>

      <div className="panel--round__body flex-column-container">
        <UnityWorld build={build} url={url} />

        <div className="unity-labeler__controls flex-row-container">
          <ToolTipWrapper reference={tooltipRef} message={'add an example'}>
            <SnapShotButton
              handleSnapshot={handleSnapshot}
              disabled={list.length === 0}
            />
          </ToolTipWrapper>
          <ToolTipWrapper reference={tooltipRef} message={'pick a class'}>
            <div className="unity-labeler__controls___select">
              <label>Select Class</label>
              <Select
                id="target-label-class"
                onChange={handleChange}
                value={targetClassId}
              >
                <LabelClassOptions />
              </Select>
            </div>
          </ToolTipWrapper>
        </div>
      </div>
      <ToolTip ref={tooltipRef} />
    </div>
  );
};

export default UnityLabeler;
