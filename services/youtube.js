// import axios from "axios";
// import { URL } from "./urls";
const httpToCurl = require("http-to-curl").default;
httpToCurl();

const axios = require("axios");
const { URL } = require("./urls");

// ("q=olafur%20arnalds&part=id&maxResults=20&type=video&key=AIzaSyBajhSzhKGPfixYYODVAKZ8HUc3NjHcJ-A");

// TODO : should store the information in more secure / separate file
const API_KEY = "AIzaSyCGX5i8Bt-AO7DDcDHLPHIMkiryDGfEeRY";

function searchYT(query) {
  return axios
    .get(URL.YOUTUBE_SEARCH_URL, {
      params: {
        q: encodeURI(query),
        part: "id",
        maxResults: 20,
        type: "video",
        key: API_KEY,
      },
    })
    .then((res) => res.data);
}

searchYT("olafur arnalds").then((res) => {
  console.log(res.items.map((r) => r.id));
  // console.log(res.items[0].id)
});
