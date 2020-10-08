import React from "react";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

function PlaylistSong(props) {
  const { title, artist, handleRemoveSong, handleSetNowPlaying } = props;

  return (
    <div className="w-full bg-pink-100 flex align-center border-b-2 border-pink-500">
      <button className="px-4" onClick={handleSetNowPlaying}>
        <PlayArrowIcon />
      </button>
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
