import React, { useState } from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Playlist from "../../container/Playlist";
import AddIcon from "@material-ui/icons/Add";
import Player from "../../container/Player";
import SearchPage from "../../container/SearchPage";
import Link from "next/link";
import { useTransition, animated, config } from "react-spring";

function RoomPage() {
  const [isSearch, setIsSearch] = useState(false);
  const transitionSearchPage = useTransition(isSearch, null, {
    from: { top: "100px", opacity: 0 },
    enter: { top: "0%", opacity: 1 },
    leave: { top: "100px", opacity: 0 },
    config: config.default,
  });

  return (
    <div className="relative overflow-hidden">
      <div className="flex flex-col h-screen">
        <div className="">
          <div className="flex justify-between sticky top-0 py-4 px-4 bg-white">
            <Link href="/">
              <button className="flex px-4 py-2 bg-gray-300 items-center">
                <div className="mr-2">
                  <ExitToAppIcon />
                </div>
                End Session
              </button>
            </Link>
            <div className="flex" onClick={() => setIsSearch(!isSearch)}>
              <button className="px-3 py-2 bg-pink-500 text-white rounded">
                <AddIcon />
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 pb-4 overflow-auto px-4">
          <Playlist />
        </div>
        <div className="sticky bottom-0">
          <Player />
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
    </div>
  );
}

export default RoomPage;
