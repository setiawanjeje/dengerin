import React, { useState } from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Playlist from "../../container/Playlist";
import AddIcon from "@material-ui/icons/Add";
import Player from "../../container/Player";
import SearchPage from "../../container/SearchPage";
import Link from "next/link";

function RoomPage() {
  const [isSearch, setIsSearch] = useState(false);

  return (
    <div>
      {isSearch ? (
        <SearchPage handleBack={() => setIsSearch(!isSearch)} />
      ) : (
        <div className="flex flex-col h-screen">
          <div className="flex-1">
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
            <div className="pb-4">
              <Playlist />
            </div>
          </div>
          <div className="sticky bottom-0">
            <Player />
          </div>
        </div>
      )}
    </div>
  );
}

export default RoomPage;
