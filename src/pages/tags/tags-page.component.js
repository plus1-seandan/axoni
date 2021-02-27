import { Select } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Artists from "../../components/artists/artists.component";
import { lastFmTags } from "../../config/lastFmRoutes";

import "./tags-page.styles.scss";

export default function TagsPage() {
  const [tags, setTags] = useState();
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTag, setSelectedTag] = useState();

  useEffect(() => {
    const asyncFetch = async () => {
      const { data } = await axios.get(lastFmTags());
      setTags(data.tags.tag);
    };
    asyncFetch();
  }, []);

  const handleChange = (e) => {
    setSelectedTag(e.target.value);
  };

  return (
    <div className="tags-page">
      <div className="tags-page-title">
        <h1>Axoni Last.fm Challenge</h1>
      </div>
      <div className="tags-page-dropdown">
        <Select
          value={selectedTag}
          onChange={handleChange}
          variant="outline"
          placeholder="Please Select a Genre"
        >
          {tags?.map((tag) => {
            return <option value={`${tag.name}`}>{tag.name}</option>;
          })}
        </Select>
      </div>
      <Artists tag={selectedTag} artists={artists} loading={loading} />
    </div>
  );
}
