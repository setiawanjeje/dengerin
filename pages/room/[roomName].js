import React, { useState, useEffect } from "react";
import NoSSR from "react-no-ssr";
import { connect } from "react-redux";
import {
  replacePlaylist,
  replaceUsers,
  replaceNowPlaying,
  logout,
  setNowPlaying,
  setIsPlaying,
} from "../../reducer/reducer";
import Link from "next/link";

import AddIcon from "@material-ui/icons/Add";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

import Playlist from "../../container/Playlist";
import Player from "../../container/Player";
import SearchPage from "../../container/SearchPage";
import ReactPlayer from "react-player";
import MenuPage from "../../components/MenuPage/MenuPage";

import { useTransition, animated, config } from "react-spring";
import { useRouter } from "next/router";
import { db } from "../../services/firebase";

function RoomPage(props) {
  const {
    playlist,
    users,
    nowPlayingIndex,
    isPlaying,
    setIsPlaying,
    replacePlaylist,
    replaceUsers,
    replaceNowPlaying,
    username,
    logout,
  } = props;
  const router = useRouter();
  const [isSearch, setIsSearch] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [videoProgressPercentage, setVideoProgressPercentage] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);

  const urlPlayer =
    nowPlayingIndex !== null && playlist
      ? `https://www.youtube.com/watch?v=${playlist[nowPlayingIndex].videoId}`
      : null;

  useEffect(() => {
    const roomName = router.query.roomName;

    if (roomName && username) {
      db.collection("rooms")
        .doc(roomName)
        .collection("playlist")
        .onSnapshot(function (querySnapshot) {
          var songs = [];
          querySnapshot.forEach(function (doc) {
            songs.push({
              title: doc.data().title,
              artist: doc.data().artist,
              videoId: doc.data().videoId,
            });
          });
          replacePlaylist(songs);
        });

      db.collection("rooms")
        .doc(roomName)
        .collection("users")
        .onSnapshot(function (querySnapshot) {
          var users = [];
          querySnapshot.forEach(function (doc) {
            users.push({ name: doc.data().username, id: doc.id });
          });
          replaceUsers(users);
        });

      db.collection("rooms")
        .doc(roomName)
        .onSnapshot(function (dbNowPlaying) {
          replaceNowPlaying(dbNowPlaying.data().nowPlaying);
        });
    }
    return () => {
      logout();
      if (roomName && username) {
        db.collection("rooms")
          .doc(roomName)
          .collection("users")
          .where("username", "==", username)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref
                .delete()
                .then(() => {
                  console.log("Document successfully deleted!");
                })
                .catch(function (error) {
                  console.error("Error removing document: ", error);
                });
            });
          })
          .catch(function (error) {
            console.error("Error removing document: ", error);
          });
        console.log("unmount!!!");
      }
    };
  }, [router.query.roomName]);

  const transitionSearchPage = useTransition(isSearch, null, {
    from: { top: "50px", opacity: 0 },
    enter: { top: "0%", opacity: 1 },
    leave: { top: "50px", opacity: 0 },
    config: { ...config.gentle, duration: 200 },
  });
  const transitionMenuPage = useTransition(isShowMenu, null, {
    from: { top: 0, opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { ...config.gentle, duration: 200 },
  });

  const handleOnPlaying = (payload) => {
    if (payload.playedSeconds !== 0 && videoDuration !== 0) {
      setVideoProgressPercentage((payload.playedSeconds / videoDuration) * 100);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div className="flex flex-col h-screen">
        {username ? (
          <>
            <div className="relative">
              <div className="flex justify-between items-center sticky top-0 py-4 px-4 bg-white">
                <button
                  className="flex px-4 py-2 items-center"
                  onClick={() => setIsShowMenu(!isShowMenu)}
                >
                  <div>
                    <MenuIcon />
                  </div>
                </button>
                <div className="flex" onClick={() => setIsSearch(!isSearch)}>
                  <button className="px-3 py-2 bg-pink-500 text-white rounded">
                    <AddIcon />
                  </button>
                </div>
              </div>
              <div className="absolute transform -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2">
                <MusicNoteIcon className="text-pink-500" fontSize="large" />
              </div>
            </div>
            <div>
              <NoSSR>
                <ReactPlayer
                  width="100%"
                  height="30vh"
                  style={{ maxHeight: "320px" }}
                  onProgress={handleOnPlaying}
                  onDuration={(value) => setVideoDuration(value)}
                  url={urlPlayer}
                  playing={isPlaying}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
              </NoSSR>
            </div>
            <div className="flex-1 pb-4 overflow-auto px-4">
              <Playlist />
            </div>
            <div className="sticky bottom-0">
              <Player
                onClickPlay={() => setIsPlaying(!isPlaying)}
                progressNowPlaying={videoProgressPercentage}
                isPlaying={isPlaying}
              />
            </div>
          </>
        ) : (
          <div className="h-full flex  flex-col items-center justify-center">
            <div className="mb-8">Please login first</div>
            <Link href="/">
              <div className="flex cursor-pointer underline text-pink-500">
                <span className="mr-2">Go to login page </span>
                <ArrowRightAltIcon />
              </div>
            </Link>
          </div>
        )}
      </div>
      {transitionSearchPage.map(
        ({ item, props, key }) =>
          item && (
            <animated.div
              key={key}
              style={props}
              className="absolute w-full z-10 h-screen"
            >
              <SearchPage handleBack={() => setIsSearch(!isSearch)} />
            </animated.div>
          )
      )}
      {transitionMenuPage.map(
        ({ item, props, key }) =>
          item && (
            <animated.div
              key={key}
              style={props}
              className="absolute w-full z-10 h-screen"
            >
              <MenuPage
                handleClose={() => setIsShowMenu(!isShowMenu)}
                users={users}
              />
            </animated.div>
          )
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  const { nowPlaying, playlist, users, username } = state;
  return {
    users: users,
    playlist: playlist,
    nowPlayingIndex: nowPlaying.index,
    isPlaying: nowPlaying.isPlaying,
    username: username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    replacePlaylist: (payload) => dispatch(replacePlaylist(payload)),
    replaceUsers: (payload) => dispatch(replaceUsers(payload)),
    replaceNowPlaying: (payload) => dispatch(replaceNowPlaying(payload)),
    setIsPlaying: (payload) => dispatch(setIsPlaying(payload)),
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomPage);
