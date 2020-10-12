import React from "react";
import { PlayArrow, SkipNext } from "@material-ui/icons";
import ProgressBar from "../ProgressBar/ProgressBar";

function Player(props) {
  const { title, artist, onClickPlay } = props;
  return (
    <div>
      <ProgressBar percentage={55} />
      <div className="flex bg-pink-500 text-white">
        <div className="flex-1  py-2 px-4 overflow-hidden">
          <div className="text-lg font-bold truncate">
            {title ? title : "-"}
          </div>
          <div className="text-sm truncate">{artist ? artist : "-"}</div>
        </div>
        <div>
          <button
            className="px-4 h-full"
            onClick={() => {
              console.log("test");
              onClickPlay();
            }}
          >
            <PlayArrow fontSize="large" />
          </button>
          <button className="px-4 h-full">
            <SkipNext fontSize="large" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Player;
