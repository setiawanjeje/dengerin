import { connect } from "react-redux";
import ReactPlayer from "react-player";

const mapStateToProps = (state) => {
  const { playlist } = state;
  return {
    url: playlist.map((p) => `https://www.youtube.com/watch?v=${p.song}`),
    playing: true,
  };
};

const mapDispatchToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ReactPlayer);
