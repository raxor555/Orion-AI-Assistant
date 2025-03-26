
import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  sender: "user" | "jarvis";
  timestamp: Date;
}

interface MessageDisplayProps {
  messages: Message[];
  isProcessing: boolean;
  className?: string;
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({ 
  messages, 
  isProcessing,
  className 
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={cn("flex flex-col h-full overflow-hidden", className)}>
      <div className="flex-1 overflow-y-auto p-4 scrollbar-none space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <h3 className="text-xl font-light mb-2">Welcome to Jarvis</h3>
            <p className="max-w-sm">Click the microphone button below to start a conversation.</p>
          </div>
        )}
        
        {messages.map((message) => (
          <div 
            key={message.id}
            className={cn(
              "message-container animate-fade-in",
              message.sender === "user" ? "flex justify-end" : "flex justify-start"
            )}
          >
            <div 
              className={message.sender === "user" ? "user-message" : "jarvis-message"}
            >
              <p className="text-sm mb-1">{message.text}</p>
              <div className="text-xs opacity-60 text-right">
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        
        {isProcessing && (
          <div className="flex justify-start">
            <div className="jarvis-message">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageDisplay;
