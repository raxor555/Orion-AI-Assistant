
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
        widget.setAttribute('agent-id', 'QZvc2TuEaDwkKjClhUDH');
        elevenLabsWidgetRef.current.appendChild(widget);
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black relative overflow-hidden">
      {/* Circuit background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/3ed191fb-28a1-42ac-8a1b-ccbf26ece45f.png" 
          alt="Jarvis Interface Background" 
          className="w-full h-full object-cover opacity-90"
        />
      </div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Main interface */}
        <JarvisInterface className="relative z-10" />
        
        {/* Credits */}
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            Powered by ElevenLabs & React
          </p>
        </div>
      </div>

      {/* Hidden empty div for potential future uses */}
      <div ref={elevenLabsWidgetRef} className="hidden"></div>
    </div>
  );
};

export default Index;
