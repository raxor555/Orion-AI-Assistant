
import React, { useEffect } from 'react';
import './ElevenLabsStyles.css';

interface ElevenLabsConfigProps {
  agentId: string;
}

const ElevenLabsConfig: React.FC<ElevenLabsConfigProps> = ({ agentId }) => {
  useEffect(() => {
    // Function to handle widget events
    const handleWidgetEvents = () => {
      // Check if the ElevenLabs widget has loaded
      const widgetInterval = setInterval(() => {
        // Look for the widget's shadow root element which indicates it's fully loaded
        const widgetElement = document.querySelector('elevenlabs-convai');
        
        if (widgetElement && (widgetElement as any).shadowRoot) {
          clearInterval(widgetInterval);
          console.log('ElevenLabs widget loaded successfully');
          
          // You can add additional configuration here
          // For example, applying custom styles or attaching event listeners
        }
      }, 500);
      
      // Clean up interval on component unmount
      return () => clearInterval(widgetInterval);
    };
    
    handleWidgetEvents();
  }, [agentId]);
  
  return (
    <div className="elevenlabs-wrapper">
      <elevenlabs-convai agent-id={agentId}></elevenlabs-convai>
    </div>
  );
};

export default ElevenLabsConfig;
