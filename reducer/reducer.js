let id = 0;

export const initialState = {
  roomName: "",
  username: "",
  playlist: [],
  nowPlaying: {
    title: null,
    artist: null,
  },
};

const LOG_IN = "LOG_IN";
const SET_NOW_PLAYING = "SET_NOW_PLAYING";
const ADD_SONG_TO_PLAYLIST = "ADD_SONG_TO_PLAYLIST";
const REMOVE_SONG_FROM_PLAYLIST = "REMOVE_SONG_FROM_PLAYLIST";

// action creator
export const login = (payload) => {
  return {
    type: LOG_IN,
    payload,
  };
};

export const setNowPlaying = (payload) => {
  return {
    type: SET_NOW_PLAYING,
    payload,
  };
};

export const addSongToPlaylist = (payload) => {
  return {
    type: ADD_SONG_TO_PLAYLIST,
    payload,
  };
};

export const removeSongFromPlaylist = (payload) => {
  return {
    type: REMOVE_SONG_FROM_PLAYLIST,
    payload,
  };
};

export const reducer = (state, action) => {
  let clonePlaylist = [...state.playlist];
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        roomName: action.payload.roomName,
        username: action.payload.username,
      };
    case SET_NOW_PLAYING:
      return {
        ...state,
        nowPlaying: {
          title: action.payload.title,
          artist: action.payload.artist,
        },
      };
    case ADD_SONG_TO_PLAYLIST:
      clonePlaylist.push({
        id: id++,
        title: action.payload.title,
        artist: action.payload.artist,
      });
      return {
        ...state,
        playlist: clonePlaylist,
      };
    case REMOVE_SONG_FROM_PLAYLIST:
      return {
        ...state,
        playlist: clonePlaylist.filter((value) => value.id !== action.payload),
      };
    default:
      return state;
  }
};
