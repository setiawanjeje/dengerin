import Playlist from "../components/Playlist/Playlist";
import { connect } from "react-redux";
import { setNowPlaying, removeSongFromPlaylist } from "../reducer/reducer";

const mapStateToProps = (state) => {
  return {
    playlist: state.playlist,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNowPlaying: (payload) => dispatch(setNowPlaying(payload)),
    removeSongFromPlaylist: (payload) =>
      dispatch(removeSongFromPlaylist(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
