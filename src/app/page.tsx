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

  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center">
      <Chat messages={messages} />
      <form
        onSubmit={handleSubmitForm}
        className="flex items-center p-2 rounded-full shadow-md gap-4 min-w-[300px] md:min-w-[500px] lg:min-w-[700px]"
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
      <div></div>
    </div>
  );
}
