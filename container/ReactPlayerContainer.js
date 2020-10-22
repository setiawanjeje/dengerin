import { connect } from "react-redux";
import ReactPlayer from "react-player";
import { setIsPlaying } from "../reducer/reducer";

const mapStateToProps = (state) => {
  const { nowPlaying, playlist } = state;
  return {
    url:
      nowPlaying.index !== null
        ? `https://www.youtube.com/watch?v=${
            playlist[nowPlaying.index].videoId
          }`
        : null,
    playing: nowPlaying.isPlaying,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPlay: () => dispatch(setIsPlaying({ isPlaying: true })),
    onPause: () => dispatch(setIsPlaying({ isPlaying: false })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReactPlayer);
