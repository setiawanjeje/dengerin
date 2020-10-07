import React from "react";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

function PlaylistSong(props) {
  const { title, artist } = props;

  return (
    <div className="w-full bg-pink-100 flex align-center border-b-2 border-pink-500">
      <div className="flex-1 py-2 px-4 ">
        <div className="text-lg">{title}</div>
        <div className="text-sm">{artist}</div>
      </div>
      <button className="px-4">
        <DeleteOutlineIcon />
      </button>
    </div>
  );
}

export default PlaylistSong;
