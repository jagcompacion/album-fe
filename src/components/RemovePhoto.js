import React, { useState, useContext } from "react";
import axios from "axios";
import PhotoContext from "../contexts/PhotoContext";
import cogoToast from "cogo-toast";
import { Button, Modal } from "react-bootstrap";

const RemovePhoto = ({ photo }) => {
  const { photos, setPhotos } = useContext(PhotoContext);
  const [isLoading, setLoading] = useState(false);
  const [isShowModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(!isShowModal);
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.delete(
        `http://localhost:8888/photos/${photo.album}/${photo.name}`
      );
      cogoToast.success("Deleted");
      setPhotos(photos.filter((photoItem) => photoItem.id !== photo.id));
    } catch (err) {
      cogoToast.error(err.toString());
    }
  };
  return (
    <>
      <Button variant="danger" size="sm" onClick={handleShowModal}>
        Remove
      </Button>
      <Modal show={isShowModal} onHide={handleShowModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this photo?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleSubmit}>
            Delete
          </Button>
          <Button
            variant="secondary"
            onClick={handleShowModal}
            disabled={isLoading}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RemovePhoto;
