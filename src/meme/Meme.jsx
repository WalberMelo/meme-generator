import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import WebShare from "../components/Webshare";
import LoadingBar from "react-top-loading-bar";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import axios from "axios";
import "../header/ResponsiveAppBar.css";
import { Typography } from "@mui/material";
import "./meme.css";

function Meme(cloudinary) {
  //Cloudinary setup
  const { cld } = cloudinary;
  const { cloudinaryConfig } = cld;
  const cloudName = cloudinaryConfig?.cloud.cloudName;

  //States
  const [open, setOpen] = useState(false);
  const [showShareButton, setShowShareButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFileUpload, setIsFileUpload] = useState(false);

  const [hasErrorMsg, setHasErrorMsg] = useState("");
  const [progress, setProgress] = useState(0);
  const [fileUpload, setFileUpload] = useState();

  const [allMeme, setAllMeme] = useState();
  const [memeCanva, setMemeCanva] = useState();
  const [memeLink, setMemeLink] = useState();
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMeme(data.data.memes));
  }, []);

  const handleOpen = () => {
    setInterval(() => {
      handleClose();
    }, 6000);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  //This function get random meme url image based on index
  function getMemeImg() {
    const randomNumber = Math.floor(Math.random() * allMeme.length);
    const url = allMeme[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
    setShowShareButton(false);
    setIsFileUpload(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setMeme((prevText) => {
      return {
        ...prevText,
        [name]: value,
      };
    });
  }

  //This function capture meme image then send as an argument to handleCloudUrl
  function handleScreenshot() {
    html2canvas(document.getElementById("meme-img"), {
      allowTaint: true,
      useCORS: true,
    })
      .then(function (canvas) {
        // It will return a canvas element
        let memeCanva = canvas.toDataURL("image/png", 0.5);
        // setMemeCanva(memeCanva);
        handleCloudUrl(memeCanva);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  //This function send to Cloudinary in order to get link
  const handleCloudUrl = async (memeImg) => {
    setIsLoading(true);
    const formData = new FormData();

    try {
      formData.append("file", memeImg);
      formData.append("upload_preset", "meme_preset");

      const config = {
        onUploadProgress: (e) => {
          const { loaded, total } = e;
          setProgress((loaded / total) * 100);
        },
      };
      const data = await axios.post(
        `https://api.Cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData,
        config
      );
      setMemeLink(data.data.secure_url);
      setIsLoading(false);
      setShowShareButton(true);
    } catch (error) {
      console.log(error);
      setHasErrorMsg(true);
    }
  };

  const handleFileUpload = () => {
    handleCloudUrl(fileUpload);
    setIsFileUpload(true);
    setShowShareButton(false);
  };

  return (
    <main>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="form-container">
        <div className="form">
          <input
            className="form--input"
            type="text"
            placeholder="Top text"
            name="topText"
            onChange={handleChange}
            value={meme.topText}
          />
          <input
            className="form--input"
            type="text"
            placeholder="Bottom text"
            name="bottomText"
            onChange={handleChange}
            value={meme.bottomText}
          />
          <button onClick={getMemeImg} className="meme--button">
            Get a new meme image
          </button>
        </div>
      </div>

      <div className="meme form-group">
        <div id="meme-img">
          {isFileUpload ? (
            <img src={memeLink} alt="meme" className="meme--image" />
          ) : (
            <img src={meme.randomImage} alt="meme" className="meme--image" />
          )}

          <h2 className="meme--text top">{meme.topText}</h2>
          <h2 className="meme--text bottom">{meme.bottomText}</h2>
        </div>
        <div className="meme-buttons--container">
          <div>
            <button
              className="aside-button"
              type="button"
              onClick={() => {
                handleScreenshot();
                handleOpen();
              }}
            >
              Capture 📷
            </button>
            {open && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert onClose={handleClose}>Screenshot done!</Alert>
              </Stack>
            )}
          </div>
          <div>
            <button
              className="aside-button"
              type="button"
              onClick={handleFileUpload}
            >
              Upload Image 🗂️
            </button>
            <input
              type="file"
              onChange={(e) => setFileUpload(e.target.files[0])}
            />
            {hasErrorMsg && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="warning">Unsupported file</Alert>
              </Stack>
            )}
          </div>
          <div>{showShareButton && <WebShare memeUrl={memeLink} />}</div>
        </div>
      </div>
      {isLoading && <div className="loading"></div>}
    </main>
  );
}

export default Meme;
