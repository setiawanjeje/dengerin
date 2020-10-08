import Player from "../components/Player/Player";
import { connect } from "react-redux";
import { setNowPlaying } from "../reducer/reducer";

const mapStateToProps = (state) => {
  return {
    title: state.nowPlaying.title,
    artist: state.nowPlaying.artist,
  };
};

export default connect(mapStateToProps, null)(Player);
