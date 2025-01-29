"use client";
import { OpenAIChatModelId } from "@ai-sdk/openai/internal";
import { useChat } from "ai/react";
import { useState } from "react";

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
        <select
          name="assistant"
          value={selectedAssistant}
          onChange={(e) => setSelectedAssistant(e.target.value)}
        >
          <option value="gpt-4">Chat GPT-4</option>
          <option value="deepseek-reasoner">DeepSeek R1</option>
        </select>
      </div>
    </div>
  );
}
