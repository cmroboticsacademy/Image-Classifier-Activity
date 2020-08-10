import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { GiHamburgerMenu } from 'react-icons/gi';

import './MenuSelect.css';

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

const MenuSelect = (props) => {
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible
  } = useComponentVisible(false);

  const containerStyle = {
    display: 'flex'
  };

  return (
    <div ref={ref} style={containerStyle}>
      {isComponentVisible && (
        <button className="menu-select-btn">
          <GiHamburgerMenu />
          <div className="menu-select">
            <ul>
              {props.options.map((option, i) => {
                return (
                  <li
                    key={i}
                    onClick={() => {
                      setIsComponentVisible(false);
                      option[1]();
                    }}
                  >
                    {option[0]}
                  </li>
                );
              })}
            </ul>
          </div>
        </button>
      )}

      {!isComponentVisible && (
        <button className="menu-select-btn"  onClick={() => setIsComponentVisible(true)}>
          <GiHamburgerMenu/>
        </button>
      )}
    </div>
  );
};

export default MenuSelect;
