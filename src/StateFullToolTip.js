import PropTypes from "prop-types";
import React, { useCallback, useState } from "react";

import ToolTip from "./ToolTip";

const StateFullToolTip = ({ children, className, parent, ...props }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const onMouseEnter = useCallback(() => setTooltipVisible(true), [
    setTooltipVisible
  ]);

  const onMouseLeave = useCallback(() => setTooltipVisible(false), [
    setTooltipVisible
  ]);

  return (
    <>
      <span
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={p => (parent = p)}
        className={className}
        key="parent"
      >
        {props.parent}
      </span>
      {this.parent ? (
        <ToolTip
          {...props}
          active={tooltipVisible}
          parent={parent}
          key="tooltip"
        >
          {props.children}
        </ToolTip>
      ) : null}
    </>
  );
};

StateFullToolTip.propTypes = {
  className: PropTypes.string
};

export default StateFullToolTip;
