
import React, { useState } from "react";
import { useJarvisAgent } from "@/hooks/useJarvisAgent";
import MessageDisplay from "./MessageDisplay";
import VoiceRecorder from "./VoiceRecorder";
import { cn } from "@/lib/utils";

interface JarvisInterfaceProps {
  className?: string;
}

const JarvisInterface: React.FC<JarvisInterfaceProps> = ({ className }) => {
  const [state, actions] = useJarvisAgent();
  const { messages, isRecording, isProcessing, error } = state;
  const { startRecording, stopRecording, clearMessages } = actions;

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="flex items-center justify-between glass-panel p-4 mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-jarvis-highlight rounded-full animate-pulse-glow" />
          <h1 className="text-xl font-light tracking-wider text-glow">JARVIS</h1>
        </div>
        <div className="flex items-center gap-4">
          {messages.length > 0 && (
            <button
              onClick={clearMessages}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear History
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 glass-panel overflow-hidden relative">
        <div className="absolute inset-0 shadow-inner-top shadow-inner-bottom z-10 pointer-events-none" />
        
        <MessageDisplay
          messages={messages}
          isProcessing={isProcessing}
          className="h-full"
        />
      </div>

      {error && (
        <div className="bg-destructive/20 border border-destructive/50 text-destructive-foreground text-sm p-3 rounded-lg mt-4">
          {error}
        </div>
      )}

      <div className="mt-6 flex justify-center relative">
        <VoiceRecorder
          isRecording={isRecording}
          isProcessing={isProcessing}
          onStartRecording={startRecording}
          onStopRecording={stopRecording}
        />
      </div>
    </div>
  );
};

export default JarvisInterface;
