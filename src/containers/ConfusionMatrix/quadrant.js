import React, { useEffect } from "react";
import { ToolTipWrapper } from "../../components/Tooltip";
import { store } from "../../index";
import { getLabelClassByName } from "../../redux/reducers/labelClasses";
import _ from "lodash";

const Quadrant = ({
  label,
  inferences,
  selectInference,
  color,
  tooltipRef,
}) => {
  const { labelClasses } = store.getState();
  useEffect(() => {}, [inferences]);

  const selectColor = (inference) => {
    if (inference.selected) {
      return "deepskyblue";
    }
    return "white";
  };
  const getBGColor = () => {
    if (color != null) {
      return color;
    }
    return "white";
  };

  const confidenceChart = (confidences) => {
    if (confidences === undefined) {
      return null;
    }
    getPredictedHexColor(confidences);
    // Create items array
    var items = Object.keys(confidences).map(function (key) {
      return [key, confidences[key]];
    });

    // Sort the array based on the second element
    items.sort(function (first, second) {
      return second[1] - first[1];
    });

    return (
      <div className="flex-column-container confidence-tooltip-container">
        <div className="confidence-header">Classification Strength</div>
        {_.map(_.take(items, 3), (value) => (
          <div className="flex-row-container confidence_wrapper" key={value[0]}>
            <div className="confidence_tooltip" key={value[0] + "class"}>
              {value[0]}
            </div>
            <div className="bar-chart-container">
              <div
                className="p-bar"
                style={{
                  width: Math.round(value[1] * 100).toString() + "%",
                  backgroundColor: getHexColorByClassName(value[0]),
                }}
              ></div>
            </div>
            <div className="percent-value">{Math.round(value[1] * 100)}%</div>
          </div>
        ))}
      </div>
    );
  };
  const getHexColorByClassName = (className) => {
    // Check to see if condifence color is available. If not, it might be being edited.
    if (getLabelClassByName(labelClasses.list, className) == undefined) {
      return "#00000";
    }
    return getLabelClassByName(labelClasses.list, className).color.hex;
  };
  const getPredictedHexColor = (confidences) => {
    var predictedClass = Object.keys(confidences).reduce((a, b) =>
      confidences[a] > confidences[b] ? a : b
    );
    if (getLabelClassByName(labelClasses.list, predictedClass) == undefined) {
      return "#00000";
    }
    return getLabelClassByName(labelClasses.list, predictedClass).color.hex;
  };
  return (
    <div
      className="confusion-matrix__quadrant flex-row-container flex-wrap"
      style={{ backgroundColor: getBGColor() }}
    >
      <div className="quadrant-label text-center">{label}</div>
      {inferences.map((inference, id) => (
        <ToolTipWrapper
          key={id}
          reference={tooltipRef}
          message={confidenceChart(inference.confidences)}
        >
          <span
            className="confusion-matrix__quadrant__thumb"
            key={id}
            onClick={() => selectInference(inference)}
            style={{ backgroundColor: selectColor(inference) }}
          >
            <img
              src={`data:image/png;base64, ${inference.img}`}
              alt={`${label}-${id}`}
            />
          </span>
          {inference.confidences != undefined && (
            <div
              className="class-box"
              style={{
                backgroundColor: getPredictedHexColor(inference.confidences),
              }}
            ></div>
          )}
        </ToolTipWrapper>
      ))}
    </div>
  );
};

export default Quadrant;
