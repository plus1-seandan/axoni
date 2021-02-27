import React, { useEffect, useState } from "react";
import Tags from "../../components/tags/tags.component";

import "./tags-page.styles.scss";

export default function TagsPage() {
  return (
    <div className="tags-page">
      <Tags />
    </div>
  );
}
