import React, { Component, useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import Card from "./Card";

const portalNodes = {};

const ToolTip = props => {
  const { active = false, group = "main", tooltipTimeout = 500 } = props;
  const initialActive = useRef(active);

  useEffect(() => {
    if (!portalNodes[group]) {
      return;
    }

    const props = { ...nextProps };
    const newProps = { ...nextProps };

    if (portalNodes[group] && portalNodes[group].timeout) {
      clearTimeout(portalNodes[group].timeout);
    }

    if (!active) {
      newProps.active = true;
      portalNodes[group].timeout = setTimeout(() => {
        props.active = false;
        renderPortal(group, props);
      }, tooltipTimeout);
    }

    renderPortal(group, newProps);
  }, [active, group]);

  useEffect(() => {
    // didMount
    initialActive.current && renderPortal(group, props);

    // componentWillUnmount
    return () => {
      if (portalNodes[group]) {
        ReactDOM.unmountComponentAtNode(portalNodes[group].node);
        clearTimeout(portalNodes[group].timeout);

        try {
          document.body.removeChild(portalNodes[group].node);
        } catch (e) {}

        portalNodes[group] = null;
      }
    };
  }, []);

  return null;
};

/**
 * Create portal and store private ref
 */
const createPortal = group => {
  portalNodes[group] = {
    node: document.createElement("div"),
    timeout: false
  };
  portalNodes[group].node.className = "ToolTipPortal";
  document.body.appendChild(portalNodes[group].node);
};

/**
 * Render portal group
 */
const renderPortal = (group, props) => {
  if (!portalNodes[group]) {
    createPortal(group);
  }
  const { parent, ...other } = props;
  const parentEl =
    typeof parent === "string" ? document.querySelector(parent) : parent;
  const child = <Card parentEl={parentEl} {...other} />;

  ReactDOM.render(child, portalNodes[group].node);
};

ToolTip.propTypes = {
  parent: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  active: PropTypes.bool,
  group: PropTypes.string,
  tooltipTimeout: PropTypes.number
};

export default memo(ToolTip);
