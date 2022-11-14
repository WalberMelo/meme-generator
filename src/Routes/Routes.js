import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";
import Meme from "../meme/Meme";
import ResponsiveAppBar from "../header/ResponsiveAppBar";
function RouterApp() {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dc0yka6eb",
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
      </Routes>
    </Router>
  );
}

export default RouterApp;
