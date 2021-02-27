import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import "./track.styles.scss";

const Track = ({ track, idx, maxPlays }) => {
  const convertWidth = () => {
    let widthFloat = (track?.playcount / maxPlays) * 100;
    let width = widthFloat.toString();
    return width + "%";
  };

  const width = convertWidth();

  return (
    <div className="track">
      <div className="track-line1">
        <span className="track-number"> {idx + 1}</span>
        <div className="track-actions">
          <PlayCircleFilledIcon />
          <FavoriteBorderIcon />
        </div>
        <div className="track-album-image-container">
          <img src={track?.album?.image[0]["#text"]} alt="album cover" />
        </div>
        <h1 className="track-title">{track?.name}</h1>
      </div>
      <div className="track-line2">
        <span style={{ width: width }} className="track-playcount">
          plays: {track?.playcount}
        </span>
      </div>
    </div>
  );
};

export default Track;
