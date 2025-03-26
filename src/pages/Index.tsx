
import JarvisInterface from "@/components/JarvisInterface";
import { useEffect, useRef } from "react";

const Index = () => {
  const elevenLabsWidgetRef = useRef<HTMLDivElement>(null);

  // Initialize the widget on component mount
  useEffect(() => {
    if (elevenLabsWidgetRef.current) {
      // Create the widget element if it doesn't exist
      const existingWidget = document.querySelector('elevenlabs-convai');
      if (!existingWidget) {
        const widget = document.createElement('elevenlabs-convai');
        widget.setAttribute('agent-id', 'DjFo0p087khwYjZ93yX6');
        elevenLabsWidgetRef.current.appendChild(widget);
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-jarvis-dark to-jarvis-light/80">
      <div className="w-full max-w-md h-[700px] relative">
        {/* Ambient light effect */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-jarvis-accent/20 blur-[100px] rounded-full" />
        
        {/* Main interface */}
        <JarvisInterface className="h-full relative z-10" />
        
        {/* Hidden container for ElevenLabs widget */}
        <div ref={elevenLabsWidgetRef} className="hidden"></div>
        
        {/* Credits */}
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            Powered by ElevenLabs & React
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
