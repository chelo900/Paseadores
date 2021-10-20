import React from "react";
import "./Message.css";

export default function Message({ own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://www.cronica.com.ar/__export/1580407745588/sites/cronica/img/2020/01/30/imagen_crop1580407486161.jpg_543804098.jpg"
          alt=""
        />
        <p className="messageText">Hello is a message</p>
      </div>
      <div className="messageBottom">1 hour ago</div>
    </div>
  );
}
