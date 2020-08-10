import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { GithubPicker } from 'react-color';

import './ColorSelector.css';

function useComponentVisible(initialIsVisible) {
  const [isComponentVisible, setIsComponentVisible] = useState(
    initialIsVisible
  );
  const ref = useRef(null);

  const handleHideDropdown = event => {
    setIsComponentVisible(false);
  };

  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleHideDropdown, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleHideDropdown, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { ref, isComponentVisible, setIsComponentVisible };
}

const ColorSelector = ({ colorSetter, backgroundColor, id }) => {
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible
  } = useComponentVisible(false);

  const [edit, setEdit] = useState(false);

  const handleChange = (color) => {
    setEdit(false);
    colorSetter(id, color);
  };

  const availableColors = [
    // "#f44336", 
    //"#e91e63", 
    "#9c27b0", 
    "#673ab7", 
    "#3f51b5", 
    "#2196f3", 
    "#03a9f4",
    "#00bcd4", 
    //"#009688", 
    // "#4caf50", 
    // "#8bc34a", 
    "#cddc39",
    "#ffeb3b", 
    "#ffc107", 
    "#ff9800", 
    // "#ff5722", 
    "#795548", 
    "#607d8b"
  ];

  return (
    <div className="color-selector" ref={ref}>

      {isComponentVisible && (
        <span
          className="color-selector__icon"
          style={{ backgroundColor: backgroundColor}}
          onClick={() => setIsComponentVisible(false)}
        >
          <div className="color-selector__swatch">
            <GithubPicker 
              onChangeComplete={handleChange} 
              colors={availableColors}/>
          </div>
        </span>
      )}

      {!isComponentVisible && (
        <span
          className="color-selector__icon"
          style={{ backgroundColor: backgroundColor}}
          onClick={() => setIsComponentVisible(true)}
        />
      )}
    </div>
  );
};

export default ColorSelector;

