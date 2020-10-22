import Playlist from "../components/Playlist/Playlist";
import { connect } from "react-redux";
import {
  setNowPlaying,
  removeSongFromPlaylist,
  setIsPlaying,
} from "../reducer/reducer";

const mapStateToProps = (state) => {
  return {
    playlist: state.playlist,
    nowPlayingIndex: state.nowPlaying.index,
    isPlaying: state.nowPlaying.isPlaying,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNowPlaying: (payload) => dispatch(setNowPlaying(payload)),
    removeSongFromPlaylist: (payload) =>
      dispatch(removeSongFromPlaylist(payload)),
    onPauseSong: () => dispatch(setIsPlaying({ isPlaying: false })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
