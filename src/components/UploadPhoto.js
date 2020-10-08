import React, { useState, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import uuid from "react-uuid";
import UploadPhotoForm from "./UploadPhotoForm";
import cogoToast from "cogo-toast";
import PhotoContext from "../contexts/PhotoContext";

const UploadPhoto = () => {
  const { photos, setPhotos } = useContext(PhotoContext);
  const [isLoading, setLoading] = useState(false);
  const [isModalShow, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(!isModalShow);
  };
  const handleSubmit = async (input) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("album", input.album);
    formData.append("documents", input.file);
    try {
      const result = await axios.put("http://localhost:8888/photos", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      setLoading(false);
      const { data } = result.data;
      const newPhotos = data.map((item) => ({
        ...data,
        id: uuid(),
      }));
      setPhotos([...newPhotos, ...photos]);
      handleShowModal();
      cogoToast.success("Added");
    } catch (err) {
      cogoToast.error(err.toString());
    }
  };
  return (
    <>
      <Button onClick={handleShowModal}>Upload Photo</Button>
      <Modal show={isModalShow} onHide={handleShowModal}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Photo</Modal.Title>
        </Modal.Header>
        <UploadPhotoForm
          initialValues={{
            album: "",
            file: {},
          }}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          onClose={handleShowModal}
        />
      </Modal>
    </>
  );
};

export default UploadPhoto;
