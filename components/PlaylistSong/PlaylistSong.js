import React from "react";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { Pause, PlayArrow } from "@material-ui/icons";

function PlaylistSong(props) {
  const {
    title,
    artist,
    handleRemoveSong,
    handleSetNowPlaying,
    isPlaying,
    onPause,
  } = props;

  return (
    <div className="w-full bg-pink-100 flex align-center">
      {isPlaying ? (
        <button className="px-4" onClick={onPause}>
          <Pause />
        </button>
      ) : (
        <button className="px-4" onClick={handleSetNowPlaying}>
          <PlayArrow />
        </button>
      )}
      <div className="flex-1 py-2 pr-4 pl-2 overflow-hidden">
        <div className="text-lg truncate">{title}</div>
        <div className="text-sm truncate">{artist}</div>
      </div>
      <button className="px-4" onClick={handleRemoveSong}>
        <DeleteOutlineIcon />
      </button>
    </div>
  );
}

export default PlaylistSong;
