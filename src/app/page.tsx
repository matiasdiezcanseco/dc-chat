"use client";
import { useChat } from "ai/react";
import { useState } from "react";
import { Combobox } from "@/components/ui/combobox";
import { AvailableModel } from "@/lib/types/models";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";

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
          <ReactMarkdown
            components={{
              h1({ ...props }) {
                return <h1 className="text-3xl font-bold mb-8" {...props} />;
              },
              h2({ ...props }) {
                return <h2 className="text-2xl font-bold mb-8" {...props} />;
              },
              h3({ ...props }) {
                return <h3 className="text-xl font-bold mb-8" {...props} />;
              },
              li({ ...props }) {
                return <li className="ml-4 list-disc space-y-4" {...props} />;
              },
              p({ ...props }) {
                return <p className="mb-8" {...props} />;
              },
              a({ ...props }) {
                return <a className="text-blue-500 underline" {...props} />;
              },
              ul({ ...props }) {
                return <ul className="list-disc space-y-4 mb-8" {...props} />;
              },

              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, "")}
                    style={nord}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
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
