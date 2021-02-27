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

  useEffect(() => {
    const asyncFetch = async () => {
      const { data } = await axios.get(lastFmTags());
      setTags(data.tags.tag);
    };
    asyncFetch();
  }, []);

  const handleClick = async (tag) => {
    onOpen();
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
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loading ? (
              <p>...loading</p>
            ) : (
              artists.map((a) => (
                <Link to={`/artists/${a.mbid}`}>
                  {a.name} {a.listeners}
                </Link>
              ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
