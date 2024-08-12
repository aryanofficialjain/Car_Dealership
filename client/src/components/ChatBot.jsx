import React, { useState } from 'react';
import { AiOutlineRobot } from 'react-icons/ai'; // Importing a robot icon from react-icons

const ChatBotIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const togglePopup = () => setIsOpen(!isOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch(`${import.meta.env.VITE_DOMAIN_URL}/bot/question`, { // Replace with your backend URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: message }),
      });
      
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div
        style={{ position: 'fixed', bottom: '20px', right: '20px', cursor: 'pointer' }}
        onClick={togglePopup}
      >
        <AiOutlineRobot size={50} color="blue" />
      </div>

      {isOpen && (
        <div className="popup" style={{ position: 'fixed', bottom: '80px', right: '20px', background: '#fff', border: '1px solid #ccc', borderRadius: '8px', padding: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
          <h2>Ask a question</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              cols="30"
              placeholder="Ask me anything about cars..."
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <button type="submit">Send</button>
          </form>
          <div>
            <h3>Response:</h3>
            <p>{response}</p>
          </div>
          <button onClick={togglePopup} style={{ marginTop: '10px' }}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ChatBotIcon;