
import React, { useState } from "react";
import { useJarvisAgent } from "@/hooks/useJarvisAgent";
import MessageDisplay from "./MessageDisplay";
import VoiceRecorder from "./VoiceRecorder";
import ElevenLabsConfig from "./ElevenLabsConfig";
import { cn } from "@/lib/utils";

interface JarvisInterfaceProps {
  className?: string;
}

const JarvisInterface: React.FC<JarvisInterfaceProps> = ({ className }) => {
  const [state, actions] = useJarvisAgent();
  const { messages, isRecording, isProcessing, error } = state;
  const { startRecording, stopRecording, clearMessages } = actions;
  const [useElevenLabs, setUseElevenLabs] = useState(true);

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="flex items-center justify-between glass-panel p-4 mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-jarvis-highlight rounded-full animate-pulse-glow" />
          <h1 className="text-xl font-light tracking-wider text-glow">JARVIS</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setUseElevenLabs(!useElevenLabs)}
            className="text-xs px-2 py-1 rounded-md bg-jarvis-accent/20 border border-jarvis-accent/30 text-foreground transition-colors"
          >
            {useElevenLabs ? "Use Basic Voice" : "Use ElevenLabs"}
          </button>
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

      {useElevenLabs ? (
        <div className="flex-1 glass-panel overflow-hidden relative flex items-center justify-center">
          <ElevenLabsConfig agentId="DjFo0p087khwYjZ93yX6" />
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default JarvisInterface;
