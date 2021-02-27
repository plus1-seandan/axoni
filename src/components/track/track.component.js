import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import "./track.styles.scss";

const Track = ({ track, idx }) => {
  return (
    <div className="track">
      <span className="track-number"> {idx + 1}</span>
      <div className="track-actions">
        <PlayCircleFilledIcon />
        <FavoriteBorderIcon />
      </div>
      <div className="track-album-image-container">
        <img src={track?.album?.image[0]["#text"]} />
      </div>
      <h1 className="track-title">{track?.name}</h1>
      <span className="track-playcount">playcount: {track?.playcount}</span>
    </div>
  );
};

export default Track;
