import React, { useEffect, useRef, useState } from "react";
import "./Messenger.css";
import Nav from "../PerfilWalker/nav/Nav";
import Conversations from "../Conversations/Conversations";
import Message from "../Message/Message";
import ChatOnline from "../ChatOnline/ChatOnline";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const users = useSelector((state) => state.allPaseadores);
  const id = localStorage.getItem("userId");
  const scrollRef = useRef();

  console.log("IDDDDDDDDDDDDD: ", id);

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      console.log(isFirstRun);
      isFirstRun.current = false; //i'm using useRef to not run this code on the first run
      return;
    }
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + id);
        setConversations(res.data);
        // arr = conversations;
      } catch (e) {
        console.log(e);
      }
    };
    getConversations();
  }, [id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?.id);
        setMessages(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefaul();
    const message = {
      sender: id,
      text: newMessage,
      conversationId: currentChat.id,
    };

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      <Nav />
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
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversations conversations={c} currentUser={id} />
              </div>
            ))}
          </div>
        </div>

        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <div>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="Escriba aqui"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Enviar
                  </button>
                </div>{" "}
              </div>
            ) : (
              <span className="noConversationText">
                Inicia una conversación
              </span>
            )}
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
