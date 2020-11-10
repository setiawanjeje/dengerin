import SearchPage from "../components/SearchPage/SearchPage";
import { connect } from "react-redux";
import { addSongToPlayList } from "../reducer/reducer";

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddSong: (payload) => dispatch(addSongToPlayList(payload)),
  };
};

export default connect(null, mapDispatchToProps)(SearchPage);
