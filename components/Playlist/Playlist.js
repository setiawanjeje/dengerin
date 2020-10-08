import React from "react";
import PlaylistSong from "../PlaylistSong/PlaylistSong";

function Playlist(props) {
  const { playlist, removeSongFromPlaylist, setNowPlaying } = props;

  return (
    <div>
      Playlist:
      {playlist && playlist.length > 0 ? (
        <ul className="overflow-hidden rounded-lg overflow-hidden">
          {playlist.map((song, key) => (
            <li key={key}>
              <PlaylistSong
                artist={song.artist}
                title={song.title}
                handleRemoveSong={() => removeSongFromPlaylist(song.id)}
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
