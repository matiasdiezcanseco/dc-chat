"use client";
import { OpenAIChatModelId } from "@ai-sdk/openai/internal";
import { useChat } from "ai/react";
import { useState } from "react";
import { Combobox } from "@/components/ui/combobox";

export default function Home() {
  const { messages, input, handleSubmit, handleInputChange, isLoading } =
    useChat();

  const [selectedAssistant, setSelectedAssistant] = useState<
    OpenAIChatModelId | "deepseek-reasoner"
  >("gpt-4");

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e, { data: { assistant: selectedAssistant } });
  };

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>
          <div>{message.role}</div>
          <div>{message.content}</div>
        </div>
      ))}

      <form onSubmit={handleSubmitForm}>
        <input
          value={input}
          placeholder="Send a message..."
          onChange={handleInputChange}
          disabled={isLoading}
        />
      </form>

      <div>
        <Combobox
          onSelect={(value) => setSelectedAssistant(value)}
          defaultValue="gpt-4"
          options={[
            { value: "gpt-4", label: "Chat GPT-4" },
            { value: "deepseek-reasoner", label: "DeepSeek R1" },
          ]}
        />
      </div>
    </div>
  );
}
