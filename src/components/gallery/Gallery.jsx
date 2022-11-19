import * as React from "react";
import "./gallery.css";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function Created() {
  const [createMeme, setCreateMeme] = React.useState("");
  const [successMsg, setSuccessMsg] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [open, setOpen] = React.useState(false);

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
      setOpen(true);
      setSuccessMsg(result.msg);
    } catch (error) {
      setOpen(true);
      setErrorMsg(error);
    }
  };

  const handleClose = () => {
    setTimeout(() => {
      setOpen(false);
    }, 5000);
  };

  const ActionAlerts = () => {
    return (
      <Stack sx={{ width: "30%" }} spacing={2} onClick={handleClose()}>
        <Alert onClose={() => handleClose()}>{successMsg}</Alert>
      </Stack>
    );
  };

  return (
    <section className="gallery-container">
      <div className="gallery-alert">
        <p className="grid--title ">Meme Gallery</p>
        <div className="alert-msg">{open && ActionAlerts()}</div>
      </div>
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
