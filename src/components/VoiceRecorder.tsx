
import React from "react";
import { Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceRecorderProps {
  isRecording: boolean;
  isProcessing: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  className?: string;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  isRecording,
  isProcessing,
  onStartRecording,
  onStopRecording,
  className,
}) => {
  const handleToggleRecording = () => {
    if (isProcessing) return;
    
    if (isRecording) {
      onStopRecording();
    } else {
      onStartRecording();
    }
  };

  return (
    <div className={cn("flex justify-center items-center py-4", className)}>
      <button
        onClick={handleToggleRecording}
        disabled={isProcessing}
        className={cn(
          "mic-button",
          isRecording && "mic-button-ripple bg-destructive hover:bg-destructive/90",
          isProcessing && "opacity-70 cursor-not-allowed"
        )}
        aria-label={isRecording ? "Stop recording" : "Start recording"}
      >
        {isRecording ? (
          <MicOff className="h-6 w-6" />
        ) : (
          <Mic className="h-6 w-6" />
        )}
      </button>
      
      <div className="absolute bottom-2 text-xs text-muted-foreground">
        {isRecording ? "Tap to stop" : isProcessing ? "Processing..." : "Tap to speak"}
      </div>
    </div>
  );
};

export default VoiceRecorder;
