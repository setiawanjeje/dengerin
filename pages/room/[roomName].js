import React, { useState, useRef } from "react";
import NoSSR from "react-no-ssr";
import Playlist from "../../container/Playlist";
import AddIcon from "@material-ui/icons/Add";
import Player from "../../container/Player";
import SearchPage from "../../container/SearchPage";
import ReactPlayerContainer from "../../container/ReactPlayerContainer";
import MenuPage from "../../components/MenuPage/MenuPage";
import { useTransition, animated, config } from "react-spring";
import MenuIcon from "@material-ui/icons/Menu";
import MusicNoteIcon from "@material-ui/icons/MusicNote";

function RoomPage() {
  const playerRef = useRef(null);
  const [isSearch, setIsSearch] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [videoProgressPercentage, setVideoProgressPercentage] = useState(0);
  const transitionSearchPage = useTransition(isSearch, null, {
    from: { top: "50px", opacity: 0 },
    enter: { top: "0%", opacity: 1 },
    leave: { top: "50px", opacity: 0 },
    config: { ...config.gentle, duration: 200 },
  });
  const transitionMenuPage = useTransition(isShowMenu, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { ...config.gentle, duration: 200 },
  });

  const handleOnPlaying = (payload) => {
    console.log(playerRef);
    if (payload.playedSeconds !== 0) {
      // TODO: get duration from ref
      console.log(payload);
      setVideoProgressPercentage(
        (payload.playedSeconds / payload.loadedSeconds) * 100
      );
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div className="flex flex-col h-screen">
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
            <ReactPlayerContainer
              playing={isPlaying}
              width="100%"
              height="30vh"
              style={{ maxHeight: "320px" }}
              onProgress={handleOnPlaying}
              ref={playerRef}
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
              className="absolute w-full z-10 h-screen top-0"
            >
              <MenuPage handleClose={() => setIsShowMenu(!isShowMenu)} />
            </animated.div>
          )
      )}
    </div>
  );
}

export default RoomPage;
