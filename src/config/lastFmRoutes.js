export const lastFmTags = () => {
  return `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptags&api_key=${process.env.REACT_APP_API_KEY}&format=json`;
};

export const lastFmArtists = (tag) => {
  return `http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=${tag}&api_key=${process.env.REACT_APP_API_KEY}&format=json`;
};

export const lastFmArtistListeners = (artist) => {
  return `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artist.name}&api_key=${process.env.REACT_APP_API_KEY}&limit=10&format=json`;
};
