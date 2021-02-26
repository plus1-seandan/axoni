export const lastFmTags = () => {
  return `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptags&api_key=${process.env.REACT_APP_API_KEY}&format=json`;
};
