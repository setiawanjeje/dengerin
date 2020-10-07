import React from "react";
import PlaylistSong from "../PlaylistSong/PlaylistSong";

function Playlist() {
  return (
    <div>
      Playlist:
      <ul className="border-2 border-b-0 border-pink-500 rounded-lg overflow-hidden">
        <li>
          <PlaylistSong artist="Akmu" title="Dinosaur" />
        </li>
        <li>
          <PlaylistSong artist="BTS" title="Dynamite" />
        </li>
        <li>
          <PlaylistSong artist="Twice" title="What is love?" />
        </li>
        <li>
          <PlaylistSong artist="EXO" title="Wolf" />
        </li>
      </ul>
    </div>
  );
}

export default Playlist;
