import { io } from "socket.io-client";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Context from "../context/Context";

const App = () => {
  const { userId, username } = useContext(Context); // Assuming userId and username come from context
  const [message, setMessage] = useState("");
  const { roomId } = useParams();
  const [allMessages, setAllMessages] = useState([]);
  const [users, setUsers] = useState({});
  const [socket, setSocket] = useState(null);
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    const socketInstance = io(import.meta.env.VITE_DOMAIN_URL);
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("connected", socketInstance.id);
    });

    socketInstance.on("received-message", ({ message, senderId, senderUsername }) => {
      console.log("Received message", { message, senderId, senderUsername });
      setAllMessages((prevMessages) => [...prevMessages, { message, senderId, senderUsername }]);
    });

    socketInstance.on("user-connected", ({ userId, username }) => {
      setUsers((prevUsers) => ({ ...prevUsers, [userId]: username }));
    });

    socketInstance.on("user-disconnected", ({ userId }) => {
      setUsers((prevUsers) => {
        const updatedUsers = { ...prevUsers };
        delete updatedUsers[userId];
        return updatedUsers;
      });
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket && username && hasJoined) {
      socket.emit("set-username", username);
      socket.emit("join-room", { roomId, userId });
    }
  }, [socket, username, hasJoined, roomId, userId]);

  const handleJoin = () => {
    if (username.trim() === "") {
      alert("Username cannot be empty");
      return;
    }
    setHasJoined(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (socket && socket.connected) {
      socket.emit("send-message", { message, roomId, senderId: userId });
      setMessage("");
    } else {
      console.error("Socket is not connected");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 py-4 px-6 shadow-md">
        <h1 className="text-2xl font-bold">Chat with Seller</h1>
      </header>

      <main className="flex-grow p-6 overflow-auto">
        {!hasJoined ? (
          <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              readOnly  // This ensures the username is displayed but not editable
              className="w-full px-4 py-2 border border-gray-600 text-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <button
              onClick={handleJoin}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-150"
            >
              Join
            </button>
          </div>
        ) : (
          <div className="flex flex-col max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="flex flex-col mb-4">
              <input
                type="text"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 text-black py-2 border border-gray-600 rounded-md shadow-sm mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-150"
              >
                Send
              </button>
            </form>
            <div className="flex flex-col space-y-2">
              {allMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-md ${
                    msg.senderId === userId ? "bg-blue-600 text-right ml-auto" : "bg-gray-700 text-left mr-auto"
                  }`}
                  style={{ alignSelf: msg.senderId === userId ? "flex-end" : "flex-start" }}
                >
                  <p className="font-semibold">{msg.senderUsername || "Anonymous"}:</p>
                  <p>{msg.message}</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Users in Room:</h3>
              <ul className="list-disc pl-5">
                {Object.entries(users).map(([userId, username]) => (
                  <li key={userId}>{username}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;