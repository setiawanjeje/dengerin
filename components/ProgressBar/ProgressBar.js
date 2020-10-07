import React from "react";
import { PlayArrow, SkipNext } from "@material-ui/icons";

function Player(props) {
  const { percentage } = props;
  return (
    <div
      className="w-full relative bg-gray-300"
      style={{ width: "100%", height: "4px" }}
    >
      <div
        className="absolute bg-pink-600 rounded-r-full"
        style={{ width: `${percentage}%`, height: "4px" }}
      ></div>
    </div>
  );
}

export default Player;
