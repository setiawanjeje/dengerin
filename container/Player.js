import Player from "../components/Player/Player";
import { connect } from "react-redux";
import { setNowPlaying, setIsPlaying } from "../reducer/reducer";

const mapStateToProps = (state) => {
  return {
    title: state.nowPlaying.title,
    artist: state.nowPlaying.artist,
    isPlaying: state.nowPlaying.isPlaying,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleNowPlaying: (payload) => dispatch(setNowPlaying(payload)),
    onClickPlay: (payload) => dispatch(setIsPlaying(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
