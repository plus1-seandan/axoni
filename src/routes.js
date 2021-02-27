import { Switch, Route, Redirect } from "react-router-dom";
import React from "react";
import TagsPage from "./pages/tags/tags-page.component";
import ArtistPage from "./pages/artist/artist-page.component";
import AlbumPage from "./pages/album/album-page.component";

class Routes extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={TagsPage} />
          <Route exact path="/artists/:mbid" component={ArtistPage} />
          <Route exact path="/albums/:name" component={AlbumPage} />
        </Switch>
      </div>
    );
  }
}

export default Routes;
