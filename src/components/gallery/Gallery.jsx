import * as React from "react";
import "./gallery.css";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function Created() {
  const [createMeme, setCreateMeme] = React.useState("");
  const [serverMsg, setServerMsg] = React.useState("");
  const [successRes, setSuccessRes] = React.useState(false);
  const [errorRes, setErrorRes] = React.useState(false);

  React.useEffect(() => {
    fetch(`http://localhost:4000/meme/getAll`)
      .then((res) => res.json())
      .then((data) => setCreateMeme(data.memes));
  }, []);

  //? Create download image
  // const exportAsImage = async (imageFileName) => {
  //   const canvas = await html2canvas(document.getElementById("meme"));
  //   const image = canvas.toDataURL("image/png", 1.0);
  //   console.log(image);
  //   downloadImage(image, imageFileName);
  // };

  // const downloadImage = (blob, fileName) => {
  //   const fakeLink = window.document.createElement("a");
  //   fakeLink.style = "display:none;";
  //   fakeLink.download = fileName;

  //   fakeLink.href = blob;

  //   document.body.appendChild(fakeLink);
  //   fakeLink.click();
  //   document.body.removeChild(fakeLink);

  //   fakeLink.remove();
  // };

  const deleteMeme = async (id) => {
    try {
      const result = axios.delete(`http://localhost:4000/meme/delete/${id}`);
      setSuccessRes(true);
      setServerMsg(result.msg);
    } catch (error) {
      setErrorRes(true);
      console.log(error);
    }
  };

  <Alert severity="error">This is an error alert — check it out!</Alert>;
  {
    /* <Alert severity="success">This is a success alert — check it out!</Alert> */
  }

  return (
    <section className="gallery-container">
      <p className="grid--title ">Meme Gallery</p>
      {!successRes && (
        <Stack sx={{ width: "50%" }} spacing={2}>
          <Alert
            sx={{ display: "flex", justifyContent: "center" }}
            severity="error"
          >
            This is an error alert — check it out!
          </Alert>
        </Stack>
      )}
      <div className="image_container">
        {Array.isArray(createMeme)
          ? createMeme.map((meme) => {
              return (
                <div key={meme._id} className="grid-img--box">
                  <div
                    className="deleteIcon-grey"
                    onClick={() => deleteMeme(meme._id)}
                  >
                    <DeleteIcon sx={{ color: "grey" }} />
                  </div>
                  <img
                    id="meme"
                    className="grid_img"
                    src={meme.url}
                    alt="meme_logo"
                  />
                </div>
              );
            })
          : null}
      </div>
    </section>
  );
}
