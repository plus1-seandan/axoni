import { Center, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getTagArtists } from "../../utils/artists";

import "./artists.styles.scss";

export default function Artists({ tag }) {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!tag) {
      return;
    }
    setArtists([]);
    const asyncFetch = async () => {
      setLoading(true);
      const artists = await getTagArtists(tag);
      setArtists(artists);
      console.log({ artists });
      setLoading(false);
    };
    asyncFetch();
  }, [tag]);

  if (!tag) {
    return (
      <div className="tags-not-selected">
        <h2>No Genre Selected</h2>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="tags-loading">
        <Spinner size="xl" />
        <span>...Loading</span>
      </div>
    );
  }
  return (
    <div className="tags">
      <h1 className="tags-title">{tag}</h1>
      <Center>
        <div className="tag-artists">
          {artists.map((a, idx) => (
            <Artist num={idx + 1} artist={a} />
          ))}
        </div>
      </Center>
    </div>
  );
}

export const Artist = ({ artist, num }) => {
  return (
    <div className="tag-artist">
      <Link to={`/artists/${artist.mbid}`}>
        <h2>
          {num}. {artist.name}
        </h2>
        <p>Total Listeners: {artist.listeners}</p>
      </Link>
    </div>
  );
};
