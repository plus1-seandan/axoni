import { Button, Spinner } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

import { Artist } from "../../components/artists/artists.component";
import { lastFmArtistInfoByName } from "../../config/lastFmRoutes";

import { getArtistInfo, getArtistTopAlbums } from "../../utils/artists";

import "./artist-page.styles.scss";

// ○ Artist information:
// ■ The artist’s name
// ■ An image of that artist
// ■ A biography of that artist

// ■ Tags associated with that artist
// ■ A maximum of 3 similar artists (with links to their pages)
// ■ An ordered list of the artist’s top albums
// ● The release date, tags, image, and complete tracklist should be viewable for each album

function ArtistPage() {
  const { mbid } = useParams();
  const [info, setInfo] = useState();
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const asyncFunc = async () => {
      const artistInfo = await getArtistInfo(mbid);
      const topAlbums = await getArtistTopAlbums(mbid);
      setAlbums(topAlbums.album);
      setInfo(artistInfo);
    };
    asyncFunc();
  }, [mbid]);

  if (!info) {
    return (
      <div className="tags-loading">
        <Spinner size="xl" />
        <span>...Loading</span>
      </div>
    );
  }
  const similarArtists = info.similar.artist.slice(0, 3);

  return (
    <div className="artist-page">
      <div className="artist-page-header">
        <h1>{info.name}</h1>
        <img src={info.image[2]["#text"]} alt="artist" />
      </div>
      <div className="artist-page-body1">
        <div className="artist-page-body1-summary-tags">
          <Link to="/">
            <button className="artist-page-body1-goback-btn">
              Back to Genres
            </button>
          </Link>

          <div className="artist-page-body1-summary">
            <p>{info.bio.summary}</p>
          </div>
          <div className="artist-page-body1-tags">
            {info.tags.tag.map((t) => (
              <Button className="artist-page-body1-tags-tag-btn" margin="5px">
                {t.name}
              </Button>
            ))}
          </div>
        </div>
        <div className="artist-page-body1-similar-artists">
          <h2>Similar To</h2>
          {similarArtists.map((a) => {
            return <SimilarArtist artist={a} />;
          })}
        </div>
      </div>
      <div className="artist-page-body2">
        <h2 className="artist-page-body2-title">ALBUMS</h2>
        <div className="artist-page-body2-albums">
          {albums?.map((album) => {
            return (
              <Link
                to={{
                  pathname: `/albums/${album.name}`,
                  state: { artist: info.name },
                }}
              >
                <div className="artist-page-body2-album">{album.name}</div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const SimilarArtist = ({ artist }) => {
  const history = useHistory();

  const handleClick = async () => {
    const result = await axios.get(lastFmArtistInfoByName(artist.name));
    if (result.data.artist.mbid) {
      history.push(`/artists/${result.data.artist.mbid}`);
    }
    return;
  };
  return (
    <div className="similar-artist" onClick={handleClick}>
      <div className="simiar-artist-img-container">
        <img src={artist.image[0]["#text"]} alt="similar-artist" />
        <p>{artist.name}</p>
      </div>
    </div>
  );
};

export default ArtistPage;
