import React from "react";
import AddIcon from "@material-ui/icons/Add";

function PlaylistSong(props) {
  const { title, artist, handleAddSong } = props;

  return (
    <div className="w-full bg-pink-100 flex align-center border-b-2 border-pink-500">
      <button className="px-4 mr-2" onClick={handleAddSong}>
        <AddIcon />
      </button>
      <div className="flex-1 py-2 pr-4 overflow-hidden">
        <div className="text-lg truncate">{title}</div>
        <div className="text-sm">{artist}</div>
      </div>
    </div>
  );
}

export default PlaylistSong;
