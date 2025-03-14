import { useIonLoading } from "@ionic/react";
import { useState } from "react";
import { GemmaService } from "../services/gemma-service";

interface Message {
  id: string;
  message: string;
  sender: "me" | "gemma";
}

export const useGemmaMessages = () => {
  const [gemmaModel] = useState(() => new GemmaService());
  const [messages, setMessages] = useState<Message[]>([]);
  const [present, dismiss] = useIonLoading();

  const loadGemmaModel = async () => {
    await present({
      message: "Loading Gemma model",
      htmlAttributes: { inert: true },
    });

    try {
      await gemmaModel.loadModel();
    } catch (error) {
      console.error("Failed to load Gemma model:", error);
    } finally {
      dismiss();
    }
  };

  const addMessage = (message: string, sender: Message["sender"]) => {
    setMessages((prev) => [
      ...prev,
      {
        id: message + Math.random(),
        message,
        sender,
      },
    ]);
  };

  const sendMessageToGemma = async (message: string) => {
    addMessage(message, "me");

    await present({ message: "Generating response..." });

    try {
      const response = await gemmaModel.generateResponse(message);

      addMessage(response, "gemma");
    } catch (error) {
      console.error("Failed to generate response:", error);
    } finally {
      await dismiss();
    }
  };

  return { messages, sendMessageToGemma, loadGemmaModel };
};
