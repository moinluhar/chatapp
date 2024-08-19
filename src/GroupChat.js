import axios from 'axios';
import { format } from 'date-fns'
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkLogin } from './CheckLogin';

export default function GroupChat() {
    const navigate = useNavigate();
    const userDetails = sessionStorage.getItem("userDetails");
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const endOfMessagesRef = useRef(null); // Ref for scrolling to the bottom

    useEffect(() => {
        checkLogin(navigate)
        fetchMessage();
    }, [navigate]);

    useEffect(() => {
        // Scroll to the bottom when messages change
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const fetchMessage = async (e) => {
        try {
            const response = await axios.get("http://localhost:4000/chat/allmessages");
            if (response.data.message === undefined) {
                setMessages(response.data.map(element => ({ id: element.user_id, text: element.message, sender: element.fullname, timestamp: element.timestamp })));
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    }

    const handleSendMessage = async (e) => {
        const loggedUser = JSON.parse(userDetails);
        if (newMessage.trim()) {
            const messageData = {
                "user_id": loggedUser.id,
                "message": newMessage
            }
            await axios.post("http://localhost:4000/chat/sendmessage", messageData);
            setMessages([...messages, { id: loggedUser.id, text: newMessage, sender: loggedUser.fullname, timestamp: format(new Date(), "yyyy-MM-dd HH:mm:ss") }]);
            setNewMessage('');
        }
    };
    return (
        <div className="mt-4">
            <div className="card">
                <div className="card-header bg-primary text-white">
                    <h4>Group Chat</h4>
                </div>
                <div className="card-body chat-body" style={{ height: '500px', overflowY: 'scroll' }}>
                    {messages.map((message, index) => (
                        <div key={index} className={`d-flex ${message.id === JSON.parse(userDetails).id ? 'justify-content-end' : 'justify-content-start'} mb-2`}>
                            <div className={`p-2 rounded ${message.id === JSON.parse(userDetails).id ? 'bg-primary text-white' : 'bg-light text-dark'}`}>
                                <strong>[{message.timestamp}] {message.sender}: </strong>{message.text}
                            </div>
                        </div>
                    ))}
                    <div ref={endOfMessagesRef} />
                </div>
                <div className="card-footer">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Type your message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} />
                        <button className="btn btn-primary me-3" onClick={handleSendMessage}>
                            Send
                        </button>
                        <button className="btn btn-primary" onClick={fetchMessage}>
                            Refresh
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

