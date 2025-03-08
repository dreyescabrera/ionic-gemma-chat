import { IonText } from "@ionic/react";
import css from "./message.module.css";

type MessageProps = {
  message: string;
  direction: "left" | "right";
};

export const Message: React.FC<MessageProps> = ({ message, direction }) => {
  return (
    <div className={`${css.message} ${css[direction]}`}>
      <IonText>{message}</IonText>
    </div>
  );
};
