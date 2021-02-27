import axios from "axios";
import { lastFmTrackInfo } from "../config/lastFmRoutes";

export const getAlbumTracks = async (artist, album, tracks) => {
  let tracksInfo = [];
  console.log({ tracks });
  for (let i = 0; i < tracks.length; i++) {
    console.log({ track: tracks[i].name });
    const { data } = await axios.get(lastFmTrackInfo(artist, tracks[i].name));
    tracksInfo.push(data);
  }
  return tracksInfo;
};
