import React from "react";
import { RWebShare } from "react-web-share";
import ShareIcon from "@mui/icons-material/Share";

export default function WebShare({ memeUrl }) {
  console.log(memeUrl);
  return (
    <div>
      <RWebShare
        data={{
          url: memeUrl,
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <button className="aside-button">
          Share Meme <ShareIcon />
        </button>
      </RWebShare>
    </div>
  );
}
