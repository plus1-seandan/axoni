import React, { useEffect, useState } from "react";
import axios from "axios";

import { lastFmTags } from "../config/lastFmRoutes";
import Tag from "../components/Tags";

export default function SelectionPage() {
  const [tags, setTags] = useState();

  useEffect(() => {
    const asyncFetch = async () => {
      const { data } = await axios.get(lastFmTags());
      setTags(data.tags.tag);
    };
    asyncFetch();
  }, []);

  if (!tags) {
    return <div>...loading</div>;
  }
  return (
    <div>
      {tags.map((tag) => {
        return <Tag tag={tag} />;
      })}
    </div>
  );
}
