import { connect } from "react-redux";
import ReactPlayer from "react-player";

const mapStateToProps = (state) => {
  const { nowPlaying } = state;
  return {
    url: `https://www.youtube.com/watch?v=${nowPlaying.videoId}`,
  };
};

const mapDispatchToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ReactPlayer);
