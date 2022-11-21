import React from "react";
import { RWebShare } from "react-web-share";

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
        <button className="aside-button ">Share Meme</button>
      </RWebShare>
    </div>
  );
}
