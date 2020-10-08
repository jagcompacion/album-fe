import React from "react";
import { Formik } from "formik";
import { shape, func, bool } from "prop-types";
import { Form, Button, Modal } from "react-bootstrap";
import uploadPhoto from "../validationSchemas/uploadPhoto";

const albums = ["Travel", "Personal", "Food", "Nature", "Other"];

const UploadPhotoForm = ({ initialValues, onSubmit, onClose, isLoading }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={uploadPhoto}
    >
      {({
        handleSubmit,
        handleChange,
        setFieldValue,
        errors,
        touched,
        values,
      }) => {
        const handleFileChange = (e) => {
          setFieldValue("file", e.currentTarget.files[0]);
        };

        return (
          <>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Album</Form.Label>
                <Form.Control
                  name="album"
                  placeholder="Enter album"
                  onChange={handleChange}
                  as="select"
                  value={values.album || ""}
                  isInvalid={touched.album && errors.album}
                >
                  <option value="">Select one</option>
                  {albums.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.album}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.File label="Photo" onChange={handleFileChange} />
                {touched.file && errors.file && (
                  <Form.Text className="text-danger">{errors.file}</Form.Text>
                )}
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="mr-2"
                disabled={isLoading}
                onClick={handleSubmit}
              >
                Upload Photo
              </Button>
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
            </Modal.Footer>
          </>
        );
      }}
    </Formik>
  );
};

UploadPhotoForm.propTypes = {
  initialValues: shape({}),
  onSubmit: func,
  onClose: func,
  isLoading: bool,
};

UploadPhotoForm.defaultProps = {
  initialValues: {},
  onSubmit: (e) => e,
  onClose: (e) => e,
  isLoading: false,
};

export default UploadPhotoForm;
