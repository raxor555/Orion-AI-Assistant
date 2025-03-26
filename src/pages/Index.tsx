
import JarvisInterface from "@/components/JarvisInterface";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-jarvis-dark to-jarvis-light/80">
      <div className="w-full max-w-md h-[700px] relative">
        {/* Ambient light effect */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-jarvis-accent/20 blur-[100px] rounded-full" />
        
        {/* Main interface */}
        <JarvisInterface className="h-full relative z-10" />
        
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
