export const lastFmTags = () => {
  return `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptags&api_key=${process.env.REACT_APP_API_KEY}&format=json`;
};

export const lastFmArtists = (tag) => {
  return `http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=${tag}&api_key=${process.env.REACT_APP_API_KEY}&format=json`;
};

export const lastFmArtistListeners = (artist) => {
  return `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artist.name}&api_key=${process.env.REACT_APP_API_KEY}&limit=10&format=json`;
};

export const lastFmArtistInfo = (mbid) => {
  return `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&mbid=${mbid}&api_key=${process.env.REACT_APP_API_KEY}&format=json`;
};

export const lastFmArtistTopAlbums = (mbid) => {
  return `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&mbid=${mbid}&api_key=${process.env.REACT_APP_API_KEY}&format=json`;
};

export const lastFmArtistInfoByName = (name) => {
  return `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${name}&api_key=${process.env.REACT_APP_API_KEY}&format=json`;
};

export const lastFmAlbumInfo = (artist, album) => {
  return `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${process.env.REACT_APP_API_KEY}&artist=${artist}&album=${album}&format=json`;
};

export const lastFmTrackInfo = (artist, track) => {
  return `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${process.env.REACT_APP_API_KEY}&artist=${artist}&track=${track}&format=json`;
};
