import Player from "../components/Player/Player";
import { connect } from "react-redux";
import {
  setNowPlaying,
  setIsPlaying,
  handlePlayNextSong,
} from "../reducer/reducer";

const mapStateToProps = (state) => {
  const { nowPlaying, playlist } = state;
  const nowPlayingSong = playlist.find(
    (element) => element.id === nowPlaying.id
  );
  return {
    title: nowPlayingSong && nowPlayingSong.title,
    artist: nowPlayingSong && nowPlayingSong.artist,
    isPlaying: nowPlaying.isPlaying,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleNowPlaying: (payload) => dispatch(setNowPlaying(payload)),
    onClickPlay: (payload) => dispatch(setIsPlaying(payload)),
    onClickNext: () => dispatch(handlePlayNextSong()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
