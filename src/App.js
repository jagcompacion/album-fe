import React, { useEffect, useContext } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Topbar from "./components/Topbar";
import RemovePhoto from "./components/RemovePhoto";
import PhotoContext from "./contexts/PhotoContext";
import axios from "axios";

const App = () => {
  const { photos, setPhotos } = useContext(PhotoContext);

  const loadPhotos = async () => {
    const result = await axios.post("http://localhost:8888/photos/list", {
      skip: 0,
      limit: 5,
    });
    const { documents } = result.data;
    setPhotos(documents);
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  return (
    <>
      <Topbar />
      <Container className="py-5">
        <Row>
          {photos.map((photo) => (
            <Col md="3" key={photo.id}>
              <Card className="mb-2">
                <Card.Img variant="top" src={photo.raw} />
                <Card.Body className="p-2">
                  <Card.Text className="mb-1">Album: {photo.album}</Card.Text>
                  <RemovePhoto photo={photo} />
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default App;
