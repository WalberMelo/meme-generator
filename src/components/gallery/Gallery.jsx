import * as React from "react";
import "./gallery.css";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

export default function Created() {
  const navigate = useNavigate();
  const [createMeme, setCreateMeme] = React.useState("");
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    fetch(`http://localhost:4000/meme/getAll`)
      .then((res) => res.json())
      .then((data) => setCreateMeme(data.memes));
  }, []);

  const deleteMeme = async (id) => {
    try {
      const result = axios.delete(`http://localhost:4000/meme/delete/${id}`);
      setOpen(true);
      window.location.reload(true);
    } catch (error) {
      console.log(error);
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
        <Alert onClose={() => handleClose()}> Meme removed successfully</Alert>
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
