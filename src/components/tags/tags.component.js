import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";

import { lastFmTags } from "../../config/lastFmRoutes";
import Tag from "../../components/tag/tag.component";
import { getTagArtists } from "../../utils/artists";

import "./tags.styles.scss";

export default function Tags() {
  const [tags, setTags] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  const handleClick = async (tag) => {
    onOpen();
    setSelectedTag(tag);
    setLoading(true);
    const artists = await getTagArtists(tag);
    setArtists(artists);
    setLoading(false);
  };

  if (!tags) {
    return <div>...loading</div>;
  }

  return (
    <div className="tags">
      <h1 className="tags-title">GENRES</h1>
      <div className="tags-list">
        {tags.map((tag) => {
          return <Tag loading={loading} tag={tag} handleClick={handleClick} />;
        })}
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>{selectedTag?.name.toUpperCase()}</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column">
            <Heading color="tomato">
              Top Artists for {selectedTag?.name.toUpperCase()}
            </Heading>
            <Artists loading={loading} artists={artists} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export const Artists = ({ loading, artists }) => {
  return (
    <div className="tag-modal-artists">
      {loading ? (
        <p>...loading. Please wait</p>
      ) : (
        artists.map((a, idx) => <Artist num={idx + 1} artist={a} />)
      )}
    </div>
  );
};

export const Artist = ({ artist, num }) => {
  return (
    <div className="tag-modal-artist">
      <Link to={`/artists/${artist.mbid}`}>
        <h2>
          {num}. {artist.name}
        </h2>
        <p>Total Listeners: {artist.listeners}</p>
      </Link>
    </div>
  );
};
