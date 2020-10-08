import React, { useRef, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SearchItem from "../SearchItem/SearchItem";

const mockSearchResult = [
  {
    title: "How can I love the heartbreak, you're the one I love",
    artist: "AKMU",
  },
  {
    title: "Location Unknown",
    artist: "HONNE",
  },
  {
    title: "cardigan",
    artist: "Taylor Swift",
  },
];

function SearchPage(props) {
  const { handleAddSong, handleBack } = props;
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  return (
    <div className="">
      <div className="flex mb-4 py-4 bg-pink-500 text-white">
        <button className="px-4 py-2 " onClick={handleBack}>
          <ArrowBackIcon />
        </button>
        <input
          className="block w-full border-2 px-4 py-2 rounded-lg text-black"
          placeholder="Search Youtube or paste Youtube URL"
          ref={inputEl}
        />
        <button className="px-4 py-2">
          <SearchIcon />
        </button>
      </div>
      <div className="px-4 ">
        Search Result:
        {mockSearchResult && (
          <ul className="border-2 border-pink-500 rounded-lg border-b-0 overflow-hidden">
            {mockSearchResult.map((song, id) => (
              <li key={id}>
                <SearchItem
                  title={song.title}
                  artist={song.artist}
                  handleAddSong={() =>
                    handleAddSong({ title: song.title, artist: song.artist })
                  }
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
