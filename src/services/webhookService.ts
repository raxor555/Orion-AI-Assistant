
/**
 * Service for handling webhook communication with the Jarvis backend
 */

// This URL should be replaced with your actual webhook endpoint
const WEBHOOK_URL = "https://your-webhook-endpoint.com/jarvis";

interface WebhookResponse {
  text: string;
  // Add any other properties your webhook might return
}

/**
 * Sends a transcribed message to the webhook endpoint
 * @param message - The transcribed user message
 * @returns Promise with the webhook response
 */
export const sendToWebhook = async (message: string): Promise<WebhookResponse> => {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`Webhook request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending message to webhook:", error);
    throw error;
  }
};
