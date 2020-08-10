import React, { useEffect, useRef, useState } from 'react';
import { UnityWorld } from './UnityWorld';
import { FaPlay, FaPause, FaInfinity } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import { setUnityConveyorBeltContinuousMode } from '../../redux/actions/unity';
import { registerEvents, requestInferenceBatch } from './unity_api';
import { ToolTipWrapper, ToolTip } from '../../components/Tooltip';

import { ObjectivePanel } from "../ObjectivesPanel/ObjectivesPanel";

const UnityConveyorBelt = () => {
  const tooltipRef = useRef(null);
  useEffect(registerEvents);

  const { unityAwake, continuousMode, waitingForScore, content } = useSelector(
    (state) => state.unityConveyorBelt
  );



  const dispatch = useDispatch();

  const readyForOneShots = !waitingForScore && unityAwake && !continuousMode;
  const readyForContinuousMode = unityAwake && !waitingForScore;

  const handleStartContinuousMode = (enabled) => {
    if (enabled) {
      if (!readyForContinuousMode) {
        return;
      }
      requestInferenceBatch();
    }
    dispatch(setUnityConveyorBeltContinuousMode(enabled));
  };

  const handleOneShot = () => {
    if (readyForOneShots) {
      requestInferenceBatch();
    }
  };
  // const isCompletedStateClass = () => {
  //   return game.completed ? "panel--round__header green" : "panel--round__header";
  // }
  return (
    <div className="flex-column-container conveyor-belt panel--round">

        <div className="conveyor-belt__controls clearfix">
          <h4 className="no-margin">Conveyor Belt Controls</h4>

          <div className="flex-row-container flex-justify-center">
            <ToolTipWrapper reference={tooltipRef} message="single batch" >
              <button
                onClick={handleOneShot}
                className={`conveyor-belt__controls_btn${
                  readyForOneShots ? '' : '__disabled'
                  }`}
              >
                <FaPlay /> 1
              </button>
            </ToolTipWrapper>
            {!continuousMode ? (
              <ToolTipWrapper reference={tooltipRef} message="start continuous mode" >
                <button
                  className={`conveyor-belt__controls_btn${
                    readyForContinuousMode ? '' : '__disabled'
                    }`}
                  onClick={() => {
                    handleStartContinuousMode(true);
                  }}
                >
                  <FaPlay /> <FaInfinity />
                </button>
              </ToolTipWrapper>
            ) : (
                <ToolTipWrapper reference={tooltipRef} message={"pause continuous mode"} >
                  <button
                    onClick={() => {
                      handleStartContinuousMode();
                    }}
                    className={`conveyor-belt__controls_btn`}
                  >
                    <FaPause />
                  </button>
                </ToolTipWrapper>
              )}
          </div>
        </div>

        <UnityWorld
          url="https://cs2n-unity-games.s3.amazonaws.com"
          build="001_08-06-1056"
        />

        <ToolTip ref={tooltipRef} />
      
      <ObjectivePanel />
    </div>
  )
};

export default UnityConveyorBelt;
