import { useEffect, useState } from "react";
import _ from "lodash";

export const useMousePosition = (mouseDown, onMouseUp, throttle) => {
  const [mousePosition, setMousePosition] = useState<any>(null);
  const throttledUpdate = _.throttle(setMousePosition, throttle);

  const updateMousePosition = (event) => {
    const pos = { x: event.clientX, y: event.clientY };
    if (throttle) {
      throttledUpdate(pos);
    } else {
      setMousePosition(pos);
    }
  };

  useEffect(() => {
    console.log("useMousePosition ++++++++++++++++++++++", mouseDown);
    if (mouseDown) {
      window.addEventListener("mousemove", updateMousePosition);
      window.addEventListener("mouseup", onMouseUp);
    } else {
      setMousePosition(null);
    }

    return () => {
      console.log("unmount useMousePosition !!!!");
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [mouseDown]);

  return mousePosition;
};
