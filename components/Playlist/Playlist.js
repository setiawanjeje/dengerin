import React from "react";
import PlaylistSong from "../PlaylistSong/PlaylistSong";

function Playlist(props) {
  const {
    playlist,
    removeSongFromPlaylist,
    setNowPlaying,
    nowPlayingId,
    onPauseSong,
    isPlaying,
  } = props;

  return (
    <div className="py-4">
      Playlist:
      {playlist && playlist.length > 0 ? (
        <ul className="overflow-hidden rounded-lg overflow-hidden">
          {playlist.map((song, index) => (
            <li key={index}>
              <PlaylistSong
                artist={song.artist}
                title={song.title}
                isPlaying={song.id === nowPlayingId && isPlaying}
                handleRemoveSong={() => removeSongFromPlaylist(song.id)}
                handleSetNowPlaying={() => setNowPlaying(song.id)}
                onPause={onPauseSong}
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
