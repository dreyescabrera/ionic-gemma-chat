import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Message } from "../components/message";
import { MessageSender } from "../components/message-sender";
import { useGemmaMessages } from "../hooks/use-gemma-messages";
import { useEffect } from "react";

export const ChatPage = () => {
  const { messages, sendMessageToGemma, loadGemmaModel } = useGemmaMessages();

  useEffect(() => {
    loadGemmaModel();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IonPage>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">Gemma Chat</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonToolbar>
          <div className="ion-padding">
            <MessageSender onSend={sendMessageToGemma} />
          </div>
        </IonToolbar>
        hola
        <div
          className="ion-padding"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className="ion-margin-top"
              style={{
                alignSelf: message.sender === "me" ? "flex-end" : "flex-start",
              }}
            >
              <Message
                message={message.message}
                direction={message.sender === "me" ? "right" : "left"}
              />
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};
