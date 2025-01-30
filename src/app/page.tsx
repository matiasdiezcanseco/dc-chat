"use client";
import { useChat } from "ai/react";
import { useState } from "react";
import { Combobox } from "@/components/ui/combobox";
import { AvailableModel } from "@/lib/types/models";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { messages, input, handleSubmit, handleInputChange, isLoading } =
    useChat({
      onFinish: () => {},
    });

  const [selectedAssistant, setSelectedAssistant] =
    useState<AvailableModel>("gpt-4");

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e, { data: { assistant: selectedAssistant } });
  };

  return (
    <div>
      <Combobox
        onSelect={(value) => setSelectedAssistant(value)}
        defaultValue="gpt-4"
        options={[
          { value: "gpt-4", label: "Chat GPT-4" },
          { value: "deepseek-reasoner", label: "DeepSeek R1" },
        ]}
      />

      {messages.map((message) => (
        <div key={message.id}>
          <div>{message.role}</div>
          <div>{message.content}</div>
        </div>
      ))}

      <form
        onSubmit={handleSubmitForm}
        className="flex items-center p-2  rounded-full shadow-md"
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
