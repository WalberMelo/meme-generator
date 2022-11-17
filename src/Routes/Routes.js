import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";
import Meme from "../components/meme/Meme";
import ResponsiveAppBar from "../components/header/ResponsiveAppBar";
import Gallery from "../components/gallery/Gallery";

function RouterApp() {
  const cld = new Cloudinary({
    cloud: {
      cloudName: `${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}`,
    },
  });

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ResponsiveAppBar />
              <Meme cld={cld} />
            </>
          }
        />
        <Route
          path="/gallery"
          element={
            <>
              <ResponsiveAppBar />
              <Gallery />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default RouterApp;
