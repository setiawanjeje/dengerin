import Player from "../components/Player/Player";
import { connect } from "react-redux";
import { setNowPlaying, setIsPlaying, playNextSong } from "../reducer/reducer";

const mapStateToProps = (state) => {
  const { nowPlaying, playlist } = state;
  return {
    title: nowPlaying.index !== null && playlist[nowPlaying.index].title,
    artist: nowPlaying.index !== null && playlist[nowPlaying.index].artist,
    isPlaying: nowPlaying.isPlaying,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleNowPlaying: (payload) => dispatch(setNowPlaying(payload)),
    onClickPlay: (payload) => dispatch(setIsPlaying(payload)),
    onClickNext: () => dispatch(playNextSong()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
