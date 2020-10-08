import React from "react";
import PlaylistSong from "../PlaylistSong/PlaylistSong";

function Playlist(props) {
  const { playlist, removeSongFromPlaylist, setNowPlaying } = props;

  return (
    <div>
      Playlist:
      {playlist && playlist.length > 0 ? (
        <ul className="border-2 border-b-0 border-pink-500 rounded-lg overflow-hidden">
          {playlist.map((song, id) => (
            <li key={id}>
              <PlaylistSong
                artist={song.artist}
                title={song.title}
                handleRemoveSong={() => removeSongFromPlaylist(song.title)}
                handleSetNowPlaying={() =>
                  setNowPlaying({ title: song.title, artist: song.artist })
                }
              />
            </li>
          ))}
        </ul>
      ) : (
        <div>No song found</div>
      )}
    </div>
  );
}

export default Playlist;
