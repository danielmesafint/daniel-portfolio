import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, User, Sparkles } from 'lucide-react';

const AIAssistant = ({ user }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: `Hello ${user?.firstName}! I'm your AI study assistant. I can help you with course questions, assignment guidance, and academic support. How can I assist you today?`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        content: "I understand your question. Let me help you with that. Based on your course materials and current progress, here's what I recommend...",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full"
    >
      <div className="bg-gray-800 rounded-xl border border-gray-700 h-[calc(100vh-280px)] flex flex-col">
        {/* Header */}
        <div className="flex items-center space-x-4 p-6 border-b border-gray-700">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">AI Study Assistant</h1>
            <p className="text-gray-400 text-sm">Your personal academic helper</p>
          </div>
          <div className="ml-auto">
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-blue-600' 
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={`rounded-2xl p-4 ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-100'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-6 border-t border-gray-700">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about your courses..."
              className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              className="bg-cyan-600 hover:bg-cyan-700 p-3 rounded-lg transition-colors duration-200"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
          
          <div className="flex items-center space-x-4 mt-3 text-xs text-gray-400">
            <span>💡 Try asking: "Help me with my ML assignment"</span>
            <span>📚 "Explain database normalization"</span>
            <span>⏰ "What are my upcoming deadlines?"</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AIAssistant;