import React, { useEffect, useState } from "react";
import "./Messenger.css";
import Nav from "../PerfilWalker/nav/Nav";
import Conversations from "../Conversations/Conversations";
import Message from "../Message/Message";
import ChatOnline from "../ChatOnline/ChatOnline";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const users = useSelector((state) => state.allPaseadores);
  const id = localStorage.getItem("userId");

  useEffect(() => {
    const getConversations = async () => {
      const res = await axios.get("/conversations/" + id);
    };
  });

  return (
    <div>
      {/* <Nav /> */}
      <div className="messenger">
        <div className="chatmenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              name=""
              id=""
              placeholder="Buscar Amigos"
              className="chatMenuInput"
            />
            <Conversations />
          </div>
        </div>

        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message />
              <Message own={true} />
              <Message />
            </div>
            <div className="chatBoxBottom">
              <textarea
                className="chatMessageInput"
                placeholder="Escriba aqui"
              ></textarea>
              <button className="chatSubmitButton">Enviar</button>
            </div>
          </div>
        </div>

        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
          </div>
        </div>
      </div>
    </div>
  );
}
