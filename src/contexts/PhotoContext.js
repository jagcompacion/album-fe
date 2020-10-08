import React, { useState } from "react";

const Context = React.createContext({
  photos: [],
  setPhotos: () => {},
});

export const PhotoProvider = ({ children }) => {
  const [photos, setPhotos] = useState([]);
  return (
    <Context.Provider
      value={{
        photos,
        setPhotos,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
