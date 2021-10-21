import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Conversations.css";

export default function Conversations({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.member.find((m) => m !== currentUser);

    const getUser = async () => {
      const res = await axios("/users");
    };
  });
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src="https://www.cronica.com.ar/__export/1580407745588/sites/cronica/img/2020/01/30/imagen_crop1580407486161.jpg_543804098.jpg"
        alt=""
      />
      <span className="conversationName">Homero</span>
    </div>
  );
}
