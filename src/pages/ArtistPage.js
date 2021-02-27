import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArtistInfo, getArtistTopAlbums } from "../utils/artists";

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
  }, []);

  if (!info) {
    return <div>...loading</div>;
  }
  const similarArtists = info.similar.artist.slice(0, 3);

  return (
    <div>
      <h1>{info.name}</h1>
      <img src={info.image[2]["#text"]} alt="artist" />
      <h2>SUMMARY</h2>
      {info.bio.summary}
      <h2>TAGS</h2>
      {info.tags.tag.map((t) => (
        <div>{t.name}</div>
      ))}
      <h2>Similar Artists</h2>
      {similarArtists.map((a) => (
        <div>{a.name}</div>
      ))}
      <h2>ALBUMS</h2>
      {albums?.map((album) => {
        return <div>{album.name}</div>;
      })}
    </div>
  );
}

export default ArtistPage;
