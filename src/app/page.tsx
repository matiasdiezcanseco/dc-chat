"use client";
import { useChat } from "ai/react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useSelectAssistant } from "@/lib/hooks/use-select-assistant";
import Chat from "@/components/chat";

export default function Home() {
  const { messages, input, handleSubmit, handleInputChange, isLoading } =
    useChat({
      onFinish: () => {},
    });

  const { assistant } = useSelectAssistant();

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e, { data: { assistant } });
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="h-full flex flex-col items-center justify-center w-[300px] md:w-[500px] lg:w-[700px] mx-auto relative ">
      <div className={`w-full ${hasMessages ? "h-full" : ""}`}>
        <Chat messages={messages} />
      </div>
      <form
        onSubmit={handleSubmitForm}
        className={`flex p-2 shadow-md gap-4 w-full ${
          hasMessages
            ? "absolute bottom-0 left-1/2 transform -translate-x-1/2 "
            : ""
        } `}
      >
        <input
          type="text"
          className="flex-grow p-3 text-sm border-none outline-none rounded-full"
          value={input}
          placeholder="Send a message..."
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <Button
          type="submit"
          variant="default"
          className="p-2 rounded-full"
          disabled={isLoading}
        >
          <Send size={20} />
        </Button>
      </form>
    </div>
  );
}
