import React from "react";
import "./ChatOnline.css";

export default function ChatOnline() {
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img
            className="chatOnlineImg"
            src="https://www.cronica.com.ar/__export/1580407745588/sites/cronica/img/2020/01/30/imagen_crop1580407486161.jpg_543804098.jpg"
            alt=""
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineUserName">Homer Simpson</span>
      </div>
    </div>
  );
}
