import { Button, Spinner } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory, useLocation } from "react-router-dom";
import Track from "../../components/track/track.component";

import { getAlbumTracks } from "../../utils/albums";
import { getAlbumInfo } from "../../utils/artists";

import "./album-page.styles.scss";

// ● The release date, tags, image, and complete tracklist should be viewable for each album

function AlbumPage() {
  const location = useLocation();
  const { name } = useParams();
  const [album, setAlbum] = useState();
  const [tracks, setTracks] = useState();
  const [maxPlaycount, setMaxPlaycount] = useState(0);

  useEffect(() => {
    const asyncFunc = async () => {
      const albumInfo = await getAlbumInfo(location.state.artist, name);
      const albumTracks = await getAlbumTracks(
        albumInfo.artist,
        albumInfo.name,
        albumInfo.tracks.track
      );
      setAlbum(albumInfo);
      setTracks(albumTracks);
      setMaxPlaycount(findMaxPlaycount(albumTracks));
    };
    asyncFunc();
  }, [name]);

  const findMaxPlaycount = (tracks) => {
    let maxPlays = 0;

    tracks.forEach((track) => {
      maxPlays = Math.max(maxPlays, parseInt(track.track.playcount));
    });
    return maxPlays;
  };

  if (!album || !tracks) {
    return (
      <div className="tags-loading">
        <Spinner size="xl" />
        <span>...Loading</span>
      </div>
    );
  }
  return (
    <div className="album-page">
      <div className="album-page-header">
        <div className="album-page-header-title">
          <h1>{album.name}</h1>
          <h2 className="album-page-header-artist">{location.state.artist}</h2>
          <p>{album?.wiki?.published}</p>
        </div>
        <img src={album.image[3]["#text"]} alt="artist" />
      </div>
      <div className="album-page-tags">
        {album.tags.tag.map((t) => (
          <Button className="artist-page-body1-tags-tag-btn" margin="5px">
            {t.name}
          </Button>
        ))}
      </div>
      <div className="album-page-tracks">
        <h1 className="album-page-tracks-header">Track List</h1>
        <div className="album-page-tracks-list">
          {tracks.map((track, idx) => (
            <Track idx={idx} track={track?.track} maxPlays={maxPlaycount} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AlbumPage;
