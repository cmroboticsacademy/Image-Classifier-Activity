import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import "./App.css";
import LabelClass from "./containers/LabelClass";
import AddExample from "./containers/AddLabelClass";
import UnityLabeler from "./containers/UnityLabeler";
import UnityConveyorBelt from "./containers/UnityConveyorBelt";
import ConfusionMatrix from "./containers/ConfusionMatrix";
import { loadMobileNetAsync } from "./redux/actions/featureExtractor";
import { loadgame } from "./redux/actions/game";

const App = ({ game }) => {
  const dispatch = useDispatch();
  const labelClasses = useSelector((state) => state.labelClasses.list);
  const featureExtractor = useSelector((state) => state.featureExtractor);
  useEffect(() => {
    dispatch(loadMobileNetAsync());
    if (game.game_settings) dispatch(loadgame(game));
  }, [dispatch]);

  return _.isEmpty(featureExtractor) ? (
    "Loading Mobilenet..."
  ) : (
    <div className="app flex-row-container flex-justify-center">
      <UnityConveyorBelt />
      <div className="flex-column-container">
        <div className="flex-row-container">
          <ConfusionMatrix />
          <UnityLabeler />
        </div>

        <div className="label-class flex-column-container">
          {labelClasses.map((labelClass) => {
            return (
              <LabelClass
                id={labelClass.id}
                key={labelClass.id}
                collapsed={labelClass.collapsed}
              />
            );
          })}

          <AddExample />
        </div>
      </div>
    </div>
  );
};

export default App;
