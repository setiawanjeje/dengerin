import React, { useRef, useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SearchItem from "../SearchItem/SearchItem";
import { searchYT } from "../../services/youtube";

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
  const [input, setInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = () => {
    searchYT(input).then((res) => {
      const newSearchResult = res.items.map((item) => item.id.videoId);
      setSearchResult(newSearchResult);
    });
  };

  return (
    <div className="h-screen bg-white w-full">
      <div className="flex mb-4 py-4 bg-pink-500 text-white">
        <button className="px-4 py-2 " onClick={handleBack}>
          <ArrowBackIcon />
        </button>
        <input
          className="block w-full border-2 px-4 py-2 rounded-lg text-black"
          placeholder="Search Youtube or paste Youtube URL"
          ref={inputEl}
          value={input}
          onChange={handleChange}
        />
        <button className="px-4 py-2" onClick={handleClick}>
          <SearchIcon />
        </button>
      </div>
      <div className="px-4 ">
        Search Result:
        {searchResult && (
          <ul className="rounded-lg overflow-hidden">
            {searchResult.map((song, id) => (
              <li key={id}>
                <SearchItem
                  title={id}
                  artist={song}
                  handleAddSong={() =>
                    handleAddSong({ title: id, artist: song })
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
