import axios from "axios";

import {
  lastFmAlbumInfo,
  lastFmArtistInfo,
  lastFmArtistListeners,
  lastFmArtists,
  lastFmArtistTopAlbums,
} from "../config/lastFmRoutes";

export const getTagArtists = async (tag) => {
  let { data } = await axios.get(lastFmArtists(tag));
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

export const getArtistInfo = async (id) => {
  const { data } = await axios.get(lastFmArtistInfo(id));
  return data.artist;
};

export const getArtistTopAlbums = async (id) => {
  const { data } = await axios.get(lastFmArtistTopAlbums(id));
  return data.topalbums;
};

export const getAlbumInfo = async (artist, album) => {
  const { data } = await axios.get(lastFmAlbumInfo(artist, album));
  return data.album;
};
