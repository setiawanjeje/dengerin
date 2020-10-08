import SearchPage from "../components/SearchPage/SearchPage";
import { connect } from "react-redux";
import { addSongToPlaylist } from "../reducer/reducer";

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddSong: (payload) => dispatch(addSongToPlaylist(payload)),
  };
};

export default connect(null, mapDispatchToProps)(SearchPage);
