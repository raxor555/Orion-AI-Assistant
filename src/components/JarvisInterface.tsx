
import React from "react";
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
    <div className={cn("flex flex-col items-center", className)}>
      {/* Circular Jarvis Interface */}
      <div className="relative">
        {/* Outer ring */}
        <div className="w-[450px] h-[450px] rounded-full border-4 border-jarvis-accent/30 flex items-center justify-center relative">
          {/* Second ring */}
          <div className="w-[360px] h-[360px] rounded-full border-2 border-jarvis-accent/40 flex items-center justify-center relative">
            {/* Inner ring with pulse */}
            <div className="w-[300px] h-[300px] rounded-full bg-jarvis-dark/60 border border-jarvis-accent/60 flex flex-col items-center justify-center relative overflow-hidden">
              {/* Pulsing core */}
              <div className="absolute w-[120px] h-[120px] rounded-full bg-jarvis-accent/20 animate-pulse-slow"></div>
              
              {/* Jarvis title */}
              <div className="mb-4 flex items-center space-x-3">
                <div className="w-3 h-3 bg-jarvis-highlight rounded-full animate-pulse-glow" />
                <h1 className="text-xl font-light tracking-wider text-glow">JARVIS</h1>
              </div>

              {/* Messages display */}
              <div className="w-[260px] h-[150px] rounded-xl glass-panel overflow-hidden relative mb-4">
                <MessageDisplay
                  messages={messages}
                  isProcessing={isProcessing}
                  className="h-full"
                />
              </div>

              {/* Voice recorder */}
              <VoiceRecorder
                isRecording={isRecording}
                isProcessing={isProcessing}
                onStartRecording={startRecording}
                onStopRecording={stopRecording}
              />

              {/* Clear history button */}
              {messages.length > 0 && (
                <button
                  onClick={clearMessages}
                  className="absolute bottom-4 left-4 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clear History
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Circuit lines - decorative elements */}
        <div className="absolute top-0 right-[100px] w-[100px] h-[2px] bg-jarvis-accent/60"></div>
        <div className="absolute bottom-0 left-[100px] w-[100px] h-[2px] bg-jarvis-accent/60"></div>
        <div className="absolute left-0 top-[100px] w-[2px] h-[100px] bg-jarvis-accent/60"></div>
        <div className="absolute right-0 bottom-[100px] w-[2px] h-[100px] bg-jarvis-accent/60"></div>
      </div>

      {error && (
        <div className="bg-destructive/20 border border-destructive/50 text-destructive-foreground text-sm p-3 rounded-lg mt-4 max-w-[400px]">
          {error}
        </div>
      )}
    </div>
  );
};

export default JarvisInterface;
