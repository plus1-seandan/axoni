import "./tag.styles.scss";

const Tag = ({ loading, tag, handleClick }) => {
  return (
    <div className="tag">
      <button
        className="tag-button"
        disabled={loading}
        onClick={() => {
          handleClick(tag);
        }}
      >
        {tag.name.toUpperCase()}
      </button>
    </div>
  );
};

export default Tag;
