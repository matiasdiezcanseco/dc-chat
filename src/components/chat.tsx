import { Message } from "ai";
import React, { memo } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MyComponentProps {
  messages: Message[];
}

const Chat: React.FC<MyComponentProps> = ({ messages }) => {
  return (
    <div className="flex flex-col w-full space-y-4 p-4">
      {messages.map((message) => {
        const isUserMessage = message.role === "user";
        return (
          <div
            key={message.id}
            className={`rounded-full ${
              isUserMessage
                ? "bg-zinc-900 w-fit py-4 px-6 flex self-end"
                : "text-left"
            }`}
          >
            <ReactMarkdown
              components={{
                h1({ ...props }) {
                  return <h1 className="text-3xl font-bold mb-4" {...props} />;
                },
                h2({ ...props }) {
                  return <h2 className="text-2xl font-bold mb-4" {...props} />;
                },
                h3({ ...props }) {
                  return <h3 className="text-xl font-bold mb-4" {...props} />;
                },
                li({ ...props }) {
                  return <li className="ml-4 list-disc space-y-4" {...props} />;
                },
                p({ ...props }) {
                  return <p className="" {...props} />;
                },
                a({ ...props }) {
                  return (
                    <a className="text-blue-500 underline mb-4" {...props} />
                  );
                },
                ul({ ...props }) {
                  return <ul className="list-disc space-y-4 mb-4" {...props} />;
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
        );
      })}
    </div>
  );
};

export default memo(Chat);
