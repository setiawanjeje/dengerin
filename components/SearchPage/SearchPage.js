import React, { useRef, useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SearchItem from "../SearchItem/SearchItem";
import { Formik, Form, Field, ErrorMessage } from "formik";
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

  const handleSubmit = (values) => {
    // searchYT(values.searchInput).then((res) => {
    //   const newSearchResult = res.items.map((item) => {
    //     return {
    //       artist: item.snippet.channelTitle,
    //       title: item.snippet.title,
    //       videoId: item.id.videoId,
    //     };
    //   });
    //   setSearchResult(newSearchResult);
    // });
  };

  return (
    <div className="h-screen bg-white w-full">
      <div className="flex mb-4 py-4 bg-pink-500 text-white">
        <button className="px-4 py-2 " onClick={handleBack}>
          <ArrowBackIcon />
        </button>
        <Formik onSubmit={handleSubmit} initialValues={{ searchInput: "" }}>
          <Form className="flex flex-1">
            <Field
              name="searchInput"
              className="block w-full border-2 px-4 py-2 rounded-lg text-black"
              placeholder="Search Youtube or paste Youtube URL"
              innerRef={inputEl}
            />
            <button className="px-4 py-2" onClick={handleSubmit}>
              <SearchIcon />
            </button>
          </Form>
        </Formik>
      </div>
      <div className="px-4 ">
        {searchResult.length > 0 && (
          <>
            Search Result:
            <ul className="rounded-lg overflow-hidden">
              {searchResult.map((result, id) => (
                <li key={id}>
                  <SearchItem
                    title={result.title}
                    artist={result.artist}
                    handleAddSong={() =>
                      handleAddSong({
                        title: result.title,
                        artist: result.artist,
                        videoId: result.videoId,
                      })
                    }
                  />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
