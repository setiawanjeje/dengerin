import React from "react";
import { useSpring, animated } from "react-spring";

function ProgressBar(props) {
  const { percentage } = props;
  const styleProps = useSpring({ width: `${percentage}%` });

  return (
    <div
      className="w-full relative bg-gray-300"
      style={{ width: "100%", height: "4px" }}
    >
      <animated.div
        className="absolute bg-pink-600 rounded-r-full"
        style={{ height: "4px", ...styleProps }}
      ></animated.div>
    </div>
  );
}

export default ProgressBar;
