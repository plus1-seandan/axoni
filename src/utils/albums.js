import axios from "axios";
import { lastFmTrackInfo } from "../config/lastFmRoutes";

export const getAlbumTracks = async (artist, album, tracks) => {
  let tracksInfo = [];
  for (let i = 0; i < tracks.length; i++) {
    const { data } = await axios.get(lastFmTrackInfo(artist, tracks[i].name));
    tracksInfo.push(data);
  }
  return tracksInfo;
};
