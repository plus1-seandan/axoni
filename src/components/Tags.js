import { useState } from "react";
import getTagArtists from "../utils/artists";

const Tag = ({ tag }) => {
  const [artists, setArtists] = useState([]);

  const handleClick = async () => {
    const artists = await getTagArtists(tag);
    setArtists(artists);
  };

  return (
    <div>
      <div onClick={handleClick}>{tag.name}</div>
      {artists.map((a) => (
        <div>{a.listeners}</div>
      ))}
    </div>
  );
};

export default Tag;
