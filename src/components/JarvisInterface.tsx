
import React from "react";
import { useJarvisAgent } from "@/hooks/useJarvisAgent";
import MessageDisplay from "./MessageDisplay";
import { cn } from "@/lib/utils";
import ElevenLabsConfig from "./ElevenLabsConfig";

interface JarvisInterfaceProps {
  className?: string;
}

const JarvisInterface: React.FC<JarvisInterfaceProps> = ({ className }) => {
  const [state, actions] = useJarvisAgent();
  const { messages, isProcessing, error } = state;
  const { clearMessages } = actions;

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
              
              {/* Pulsing elements */}
              <div className="absolute w-full h-full">
                <div className="absolute top-[30%] left-[15%] w-2 h-2 bg-jarvis-accent rounded-full animate-pulse-glow" style={{animationDelay: "0.5s"}}></div>
                <div className="absolute top-[60%] left-[20%] w-3 h-3 bg-jarvis-highlight rounded-full animate-pulse-glow" style={{animationDelay: "1.2s"}}></div>
                <div className="absolute top-[20%] right-[25%] w-4 h-4 bg-jarvis-highlight/70 rounded-full animate-pulse-glow" style={{animationDelay: "0.8s"}}></div>
                <div className="absolute bottom-[25%] right-[15%] w-2 h-2 bg-jarvis-accent rounded-full animate-pulse-glow" style={{animationDelay: "1.7s"}}></div>
              </div>
              
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

              {/* ElevenLabs Widget properly positioned in the center */}
              <div className="elevenlabs-center-widget mt-2">
                <ElevenLabsConfig agentId="QZvc2TuEaDwkKjClhUDH" />
              </div>

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

        {/* Circuit lines - decorative elements with animation */}
        <div className="absolute top-0 right-[100px] w-[100px] h-[2px] bg-jarvis-accent/60 animate-pulse-glow" style={{animationDelay: "1s"}}></div>
        <div className="absolute bottom-0 left-[100px] w-[100px] h-[2px] bg-jarvis-accent/60 animate-pulse-glow" style={{animationDelay: "2s"}}></div>
        <div className="absolute left-0 top-[100px] w-[2px] h-[100px] bg-jarvis-accent/60 animate-pulse-glow" style={{animationDelay: "0.5s"}}></div>
        <div className="absolute right-0 bottom-[100px] w-[2px] h-[100px] bg-jarvis-accent/60 animate-pulse-glow" style={{animationDelay: "1.5s"}}></div>
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
