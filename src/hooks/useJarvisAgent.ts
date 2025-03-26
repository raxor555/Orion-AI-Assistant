
import { useState, useCallback, useRef, useEffect } from "react";
import { sendToWebhook } from "../services/webhookService";

interface Message {
  id: string;
  text: string;
  sender: "user" | "jarvis";
  timestamp: Date;
}

export interface JarvisAgentState {
  messages: Message[];
  isRecording: boolean;
  isProcessing: boolean;
  error: string | null;
}

export interface JarvisAgentActions {
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<void>;
  clearMessages: () => void;
}

/**
 * Custom hook for managing the Jarvis voice agent
 */
export const useJarvisAgent = (): [JarvisAgentState, JarvisAgentActions] => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  // Generate a unique ID for messages
  const generateId = () => `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Add a new message to the conversation
  const addMessage = (text: string, sender: "user" | "jarvis") => {
    const newMessage: Message = {
      id: generateId(),
      text,
      sender,
      timestamp: new Date(),
    };
    
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    return newMessage;
  };

  // Mock transcription function (replace with actual implementation)
  const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
    // In a real implementation, you would:
    // 1. Send the audio blob to a transcription service
    // 2. Receive and return the transcribed text
    
    // For demo purposes, we'll return a promise that resolves after a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("This is a simulated transcription of the audio input.");
      }, 1000);
    });
  };

  // Start recording audio
  const startRecording = useCallback(async () => {
    try {
      setError(null);
      
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Create a new MediaRecorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      // Set up event handlers
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = async () => {
        // Combine audio chunks into a single blob
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        
        // Process the recording
        setIsProcessing(true);
        
        try {
          // Transcribe the audio
          const transcription = await transcribeAudio(audioBlob);
          
          // Add user message
          addMessage(transcription, "user");
          
          // Send to webhook and get response
          const response = await sendToWebhook(transcription);
          
          // Add Jarvis response
          addMessage(response.text, "jarvis");
        } catch (err) {
          setError("Failed to process your message. Please try again.");
          console.error("Error processing audio:", err);
        } finally {
          setIsProcessing(false);
        }
        
        // Stop all tracks to properly release the microphone
        stream.getTracks().forEach(track => track.stop());
      };
      
      // Start recording
      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      setError("Could not access microphone. Please check your permissions.");
      console.error("Error starting recording:", err);
    }
  }, []);

  // Stop recording audio
  const stopRecording = useCallback(async () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, []);

  // Clear all messages
  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const state: JarvisAgentState = {
    messages,
    isRecording,
    isProcessing,
    error,
  };

  const actions: JarvisAgentActions = {
    startRecording,
    stopRecording,
    clearMessages,
  };

  return [state, actions];
};
