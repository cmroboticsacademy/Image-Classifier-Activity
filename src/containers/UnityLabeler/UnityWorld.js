import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Unity, { UnityContent } from 'react-unity-webgl';
import {UnityLoadingScreen} from '../UnityConveyorBelt/UnityWorld';

import { setUnityImageLabeler } from '../../redux/actions/unity';
import './UnityWorld.css';

const UnityWorld = ({ url, build }) => {
  const dispatch = useDispatch();
  const unityImageLabeler = useSelector(
    (state) => state.unityImageLabeler.content
  );
  const [loaded, isLoaded] = useState(false);
  useEffect(() => {
    let unityContent = new UnityContent(
      `${url}/${build}/unity_game.json`,
      `${url}/${build}/UnityLoader.js`
    );
    unityContent.on("loaded", () => {
      console.log('loaded');
      isLoaded(true);
    })
    dispatch(setUnityImageLabeler(unityContent));
  }, [build, url, dispatch]);

  return (
    <div className="unity-image-labeler" >
      {!loaded &&
        <UnityLoadingScreen container="loading-container-labeler" />
      }
      {unityImageLabeler ? (
        <Unity unityContent={unityImageLabeler}/>
      ) : (
        ''
      )}
    </div>
  );
};

export default UnityWorld;
