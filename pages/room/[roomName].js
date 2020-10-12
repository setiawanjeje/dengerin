import React, { useState } from "react";
import NoSSR from "react-no-ssr";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Playlist from "../../container/Playlist";
import AddIcon from "@material-ui/icons/Add";
import Player from "../../container/Player";
import SearchPage from "../../container/SearchPage";
import Link from "next/link";
import ReactPlayerContainer from "../../container/ReactPlayerContainer";
import MenuPage from "../../components/MenuPage/MenuPage";
import { useTransition, animated, config } from "react-spring";
import MenuIcon from "@material-ui/icons/Menu";

function RoomPage() {
  const [isSearch, setIsSearch] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);
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

  return (
    <div className="relative overflow-hidden">
      <div className="flex flex-col h-screen">
        <div className="">
          <div className="flex justify-between sticky top-0 py-4 px-4 bg-white">
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
        </div>
        <div>
          <NoSSR>
            <ReactPlayerContainer playing={isPlaying} />
          </NoSSR>
        </div>
        <div className="flex-1 pb-4 overflow-auto px-4">
          <Playlist />
        </div>
        <div className="sticky bottom-0">
          <Player onClickPlay={() => setIsPlaying(!isPlaying)} />
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
