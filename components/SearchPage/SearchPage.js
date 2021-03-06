import React, { useRef, useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SearchItem from "../SearchItem/SearchItem";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { searchYT } from "../../services/youtube";
import { db } from "../../services/firebase";

const mockSearchResult = [
  {
    title:
      "AKMU - '어떻게 이별까지 사랑하겠어, 널 사랑하는 거지(How can I love the heartbreak, you`re the one I love)' M/V",
    artist: "AKMU",
    videoId: "m3DZsBw5bnE",
  },
  {
    title: "Location Unknown",
    artist: "HONNE",
    videoId: "btIQvYcLNoI",
  },
  {
    title: "cardigan",
    artist: "Taylor Swift",
    videoId: "K-a8s8OLBSE",
  },
];

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function SearchPage(props) {
  const { handleAddSong, handleBack } = props;
  const inputEl = useRef(null);
  const [input, setInput] = useState("");
  const [searchResult, setSearchResult] = useState(mockSearchResult);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const handleSubmit = (values) => {
    // contoh input : https://www.youtube.com/watch?v=ZZ41gWvltT8
    const prefixYoutube = "https://www.youtube.com/";
    if (values.searchInput) {
      if (values.searchInput.startsWith(prefixYoutube)) {
        const videoId = getParameterByName("v", values.searchInput);
        console.log(videoId);
        setSearchResult([
          {
            title: "aaa", // Fawwaz's suggested song
            artist: "bbb",
            videoId: videoId,
          },
        ]);
        // const firebaseRef = db.collection("rooms").doc("123");
        // const payload = {
        //   ytURL: values,
        // };
        // firebaseRef.set(payload);
      } else {
      }
    }

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
            <p className="mb-2">Search Result:</p>
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
