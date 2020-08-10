import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Unity, { UnityContent } from 'react-unity-webgl';

import { setUnityConveyorBelt } from '../../redux/actions/unity';
import './UnityWorld.css';

const UnityWorld = ({ build, url }) => {
  const unityConveyorBelt = useSelector(
    (state) => state.unityConveyorBelt.content
  );
  const [loaded, isLoaded] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    let unityContent = new UnityContent(
      `${url}/${build}/unity_game.json`,
      `${url}/${build}/UnityLoader.js`
    );

    // If you need progress. Only gives you .1 and .9 back. Not really useful.
    // unityContent.on("progress", progression => {
    //   // console.log("progress", progression);
    // })
    unityContent.on("error", message => {
      console.error("There was an error loading unity");
      console.log(message);
    })
    unityContent.on("loaded", () => {
      console.log('Conveyor loaded');
      isLoaded(true);
    })

    dispatch(setUnityConveyorBelt(unityContent));
  }, [build, url, dispatch]);

  return (
    <div className="unity-conveyor">
      {!loaded &&
        <UnityLoadingScreen container="loading-container" />
      }
      {unityConveyorBelt ? (
        <Unity unityContent={unityConveyorBelt} />
      ) : (
          ''
        )}
    </div>
  );
};


const UnityLoadingScreen = ({container}) => {
  return (
    <div className={container}>
      <div className="loading-text" >Loading...</div>
      <div className="tickerwrap">
        <div className="ticker" />
      </div>
    </div>
  );
}
export { UnityWorld, UnityLoadingScreen };
