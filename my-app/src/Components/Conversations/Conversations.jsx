import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Conversations.css";

export default function Conversations({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser);

    const getUser = async () => {
      try {
        const res = await axios("/walkers/" + friendId);
        console.log(res);
        setUser(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  return (
    <div className="conversation">
      <img className="conversationImg" src={user.images} alt="" />
      <span className="conversationName">{user.name}</span>
    </div>
  );
}
