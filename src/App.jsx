import { useEffect, useState, useRef } from "react";
import Message from "./components/Message";
import MessageInput from "./components/MessageInput";

const socket = new WebSocket("ws://localhost:3000");

function App() {
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === "history") {
        setMessages(msg.data.map((m) => m.data));
      } else if (msg.type === "message") {
        setMessages((prev) => [...prev, msg.data]);
      }
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text) => {
    socket.send(JSON.stringify({ type: "message", data: text }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">WebSocket Chat</h1>

        <div className="h-[60vh] overflow-y-auto border border-gray-300 rounded p-4 flex flex-col gap-2 bg-gray-50">
          {messages.map((msg, index) => (
            <Message key={index} text={msg} />
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="mt-4">
          <MessageInput onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}

export default App;