import axios from "axios";

import { lastFmArtistListeners, lastFmArtists } from "../config/lastFmRoutes";

const getTagArtists = async (tag) => {
  let { data } = await axios.get(lastFmArtists(tag.name));
  const _artists = data.topartists.artist;

  let artists = [];
  for (let i = 0; i < 50; i++) {
    let { data } = await axios.get(lastFmArtistListeners(_artists[i]));
    const tracks = data.toptracks.track;
    const listeners = tracks.reduce((tot, curr) => {
      tot += parseInt(curr.listeners);
      return tot;
    }, 0);
    const artist = { ..._artists[i], listeners };
    artists.push(artist);
  }

  artists.sort((a, b) => b.listeners - a.listeners);
  return artists;
};

export default getTagArtists;
