import { db } from "../services/firebase";
import { ThunkDispatch, ThunkAction } from "redux-thunk";

interface Song {
  title: string;
  videoId: string;
  artist: string;
  id: string;
}

interface StateNowPlaying {
  id: string | null;
  isPlaying: boolean;
}

interface StateTree {
  roomName: string;
  username: string;
  users: Array<string>;
  playlist: Array<Song>;
  nowPlaying: StateNowPlaying;
}

export const initialState = {
  roomName: "",
  username: "",
  users: [],
  playlist: [],
  nowPlaying: {
    id: null,
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
export const login = (payload: { username: string; roomName: string }) => {
  return (dispatch: ThunkDispatch<{}, {}, any>) => {
    db.collection("rooms")
      .doc(payload.roomName)
      .collection("users")
      .add({ username: payload.username });

    db.collection("rooms")
      .doc(payload.roomName)
      .set({
        nowPlaying: {
          id: null,
          isPlaying: false,
        },
      });
    dispatch({ type: LOG_IN, payload });
  };
};

export const logout = () => {
  return {
    type: LOG_OUT,
  };
};

export const setNowPlaying = (payload: string) => {
  return (dispatch: ThunkDispatch<{}, {}, any>, getState: () => StateTree) => {
    const state = getState();
    db.collection("rooms")
      .doc(state.roomName)
      .set({
        nowPlaying: {
          id: payload,
          isPlaying: true,
        },
      });
    dispatch({
      type: SET_NOW_PLAYING,
      payload,
    });
  };
};

export const addSongToPlayList = (payload: Song) => {
  return (dispatch: ThunkDispatch<{}, {}, any>, getState: () => StateTree) => {
    const state = getState();

    db.collection("rooms").doc(state.roomName).collection("playlist").add({
      videoId: payload.videoId,
      title: payload.title,
      artist: payload.artist,
    });

    dispatch({
      type: ADD_SONG_TO_PLAYLIST,
      payload,
    });
  };
};

export const removeSongFromPlaylist = (payload: string) => {
  return (dispatch: ThunkDispatch<{}, {}, any>, getState: () => StateTree) => {
    const state = getState();
    db.collection("rooms")
      .doc(state.roomName)
      .collection("playlist")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.id === payload) {
            doc.ref
              .delete()
              .then(() => {
                console.log("Song successfully deleted!");
              })
              .catch(function (error) {
                console.error("Error removing document: ", error);
              });
          }
        });
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });

    db.collection("rooms")
      .doc(state.roomName)
      .collection("playlist")
      .onSnapshot(function (querySnapshot) {
        var songs: Array<Song> = [];
        querySnapshot.forEach(function (doc) {
          songs.push({
            title: doc.data().title,
            artist: doc.data().artist,
            videoId: doc.data().videoId,
            id: doc.id,
          });
        });
        replacePlaylist(songs);
      });
    dispatch({
      type: REMOVE_SONG_FROM_PLAYLIST,
      payload,
    });
  };
};

export const handlePlayNextSong = () => {
  return (dispatch: ThunkDispatch<{}, {}, any>, getState: () => StateTree) => {
    const state = getState();

    let nextIndex: number | null = null;
    state.playlist.forEach((song, idx) => {
      if (state.nowPlaying.id === song.id) {
        nextIndex = idx + 1 === state.playlist.length ? 0 : idx + 1;
      }
    });

    if (nextIndex !== null) {
      db.collection("rooms")
        .doc(state.roomName)
        .set({
          nowPlaying: {
            id: state.playlist[nextIndex].id,
            isPlaying: true,
          },
        });
      dispatch({
        type: PLAY_NEXT_SONG,
        payload: state.playlist[nextIndex].id,
      });
    }
  };
};

export const setIsPlaying = (payload: boolean) => {
  return (dispatch: ThunkDispatch<{}, {}, any>, getState: () => StateTree) => {
    const state = getState();
    db.collection("rooms")
      .doc(state.roomName)
      .set(
        {
          nowPlaying: {
            isPlaying: payload,
          },
        },
        { merge: true }
      );
    dispatch({
      type: SET_IS_PLAYING,
      payload,
    });
  };
};

export const replacePlaylist = (payload: Array<Song>) => {
  return {
    type: REPLACE_PLAYLIST,
    payload,
  };
};

export const replaceUsers = (payload: Array<string>) => {
  return {
    type: REPLACE_USERS,
    payload,
  };
};

export const replaceNowPlaying = (payload: StateNowPlaying) => {
  return {
    type: REPLACE_NOWPLAYING,
    payload,
  };
};

export const reducer = (
  state: StateTree,
  action: ThunkAction<{}, {}, {}, any>
) => {
  let clonePlaylist = [...state.playlist];
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        roomName: action.payload.roomName,
        username: action.payload.username,
      };
    case LOG_OUT:
      return initialState;
    case SET_NOW_PLAYING:
      return {
        ...state,
        nowPlaying: {
          id: action.payload,
          isPlaying: true,
        },
      };
    case ADD_SONG_TO_PLAYLIST:
      clonePlaylist.push({
        videoId: action.payload.videoId,
        title: action.payload.title,
        artist: action.payload.artist,
        id: action.payload.id,
      });
      return {
        ...state,
        playlist: [...clonePlaylist],
      };
    case REMOVE_SONG_FROM_PLAYLIST:
      return {
        ...state,
      };
    case SET_IS_PLAYING:
      return {
        ...state,
        nowPlaying: {
          ...state.nowPlaying,
          isPlaying: action.payload,
        },
      };
    case PLAY_NEXT_SONG:
      return {
        ...state,
        nowPlaying: {
          id: action.payload,
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
