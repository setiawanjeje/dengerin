import { db } from "../services/firebase";

export const initialState = {
  roomName: "",
  username: "",
  users: [],
  playlist: [],
  nowPlaying: {
    index: null,
    isPlaying: false,
  },
};

const LOG_IN = "LOG_IN";
const SET_NOW_PLAYING = "SET_NOW_PLAYING";
const ADD_SONG_TO_PLAYLIST = "ADD_SONG_TO_PLAYLIST";
const REMOVE_SONG_FROM_PLAYLIST = "REMOVE_SONG_FROM_PLAYLIST";
const SET_IS_PLAYING = "SET_IS_PLAYING";
const PLAY_NEXT_SONG = "PLAY_NEXT_SONG";
const REPLACE_PLAYLIST = "REPLACE_PLAYLIST";
const REPLACE_USERS = "REPLACE_USERS";
const REPLACE_NOWPLAYING = "REPLACE_NOWPLAYING";
const LOG_OUT = "LOG_OUT";

// action creator
export const login = (payload) => {
  return {
    type: LOG_IN,
    payload,
  };
};

export const logout = (payload) => {
  return {
    type: LOG_OUT,
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

export const playNextSong = (payload) => {
  return {
    type: PLAY_NEXT_SONG,
    payload,
  };
};

export const setIsPlaying = (payload) => {
  return {
    type: SET_IS_PLAYING,
    payload,
  };
};

export const replacePlaylist = (payload) => {
  return {
    type: REPLACE_PLAYLIST,
    payload,
  };
};

export const replaceUsers = (payload) => {
  return {
    type: REPLACE_USERS,
    payload,
  };
};

export const replaceNowPlaying = (payload) => {
  return {
    type: REPLACE_NOWPLAYING,
    payload,
  };
};

export const reducer = (state, action) => {
  console.log("payload", action.type, action.payload);
  let clonePlaylist = [...state.playlist];
  switch (action.type) {
    case LOG_IN:
      db.collection("rooms")
        .doc(action.payload.roomName)
        .collection("users")
        .add({ username: action.payload.username });

      db.collection("rooms")
        .doc(action.payload.roomName)
        .set({
          nowPlaying: {
            index: null,
            isPlaying: false,
          },
        });
      return {
        ...state,
        roomName: action.payload.roomName,
        username: action.payload.username,
      };
    case LOG_OUT:
      return initialState;
    case SET_NOW_PLAYING:
      db.collection("rooms")
        .doc(state.roomName)
        .set({
          nowPlaying: {
            index: action.payload.index,
            isPlaying: true,
          },
        });

      return {
        ...state,
        nowPlaying: {
          index: action.payload.index,
          isPlaying: true,
        },
      };
    case ADD_SONG_TO_PLAYLIST:
      db.collection("rooms").doc(state.roomName).collection("playlist").add({
        videoId: action.payload.videoId,
        title: action.payload.title,
        artist: action.payload.artist,
      });
      clonePlaylist.push({
        videoId: action.payload.videoId,
        title: action.payload.title,
        artist: action.payload.artist,
      });
      return {
        ...state,
        playlist: [...clonePlaylist],
      };
    case REMOVE_SONG_FROM_PLAYLIST:
      return {
        ...state,
        playlist: clonePlaylist.filter(
          (value) => value.videoId !== action.payload
        ),
      };
    case SET_IS_PLAYING:
      db.collection("rooms")
        .doc(state.roomName)
        .set(
          {
            nowPlaying: {
              isPlaying: action.payload,
            },
          },
          { merge: true }
        );
      return {
        ...state,
        nowPlaying: {
          ...state.nowPlaying,
          isPlaying: action.payload,
        },
      };
    case PLAY_NEXT_SONG:
      const lengthPlaylist = state.playlist.length;
      let nextIndex =
        state.nowPlaying.index + 1 === lengthPlaylist
          ? 0
          : state.nowPlaying.index + 1;
      return {
        ...state,
        nowPlaying: {
          index: nextIndex,
          isPlaying: true,
        },
      };
    case REPLACE_PLAYLIST:
      return {
        ...state,
        playlist: action.payload,
      };
    case REPLACE_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case REPLACE_NOWPLAYING:
      return {
        ...state,
        nowPlaying: {
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
