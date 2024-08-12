import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./context/Context.jsx";
import ChatBotIcon from "./components/ChatBot.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <ChatBotIcon/>
        <App />
      </BrowserRouter>
    </ContextProvider>
  </React.StrictMode>
);
