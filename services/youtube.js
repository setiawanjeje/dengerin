// import axios from "axios";
// import { URL } from "./urls";
const httpToCurl = require("http-to-curl").default;
httpToCurl();

const axios = require("axios");
const { URL } = require("./urls");

// ("q=olafur%20arnalds&part=id&maxResults=20&type=video&key=AIzaSyBajhSzhKGPfixYYODVAKZ8HUc3NjHcJ-A");

// jukebox : part=id&maxResults=20&type=video&q=olafur%20arnalds&key=AIzaSyBajhSzhKGPfixYYODVAKZ8HUc3NjHcJ-A

// TODO : should store the information in more secure / separate file
const API_KEY = "AIzaSyCGX5i8Bt-AO7DDcDHLPHIMkiryDGfEeRY";

function searchYT(query) {
  return axios
    .get(
      `https://content.googleapis.com/youtube/v3/search?part=id&maxResults=20&type=video&q=${encodeURI(
        query
      )}&key=${API_KEY}`
    )
    .then((res) => res.data);
}

searchYT("olafur arnalds").then((res) => {
  console.log(res.items.map((r) => r.id));
  // console.log(res.items[0].id)
});
