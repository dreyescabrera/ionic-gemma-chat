import { IonTextarea } from "@ionic/react";

type MessageSenderProps = {
  onSend: (message: string) => void;
};

export const MessageSender: React.FC<MessageSenderProps> = ({ onSend }) => {
  const enterMessage = (e: CustomEvent) => {
    const target = e.target as HTMLIonTextareaElement;
    const inputEvent = e.detail.event as InputEvent;

    const isEnter = inputEvent?.inputType === "insertLineBreak";
    const isEmpty = target.value === "";

    if (isEnter && !isEmpty) {
      onSend(target.value!);
      target.value = "";
    }
  };

  return (
    <section>
      <IonTextarea
        placeholder="How are you today?"
        onIonInput={enterMessage} // Uncontrolled behavior
      />
    </section>
  );
};
