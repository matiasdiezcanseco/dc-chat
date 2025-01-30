"use client";
import { useState } from "react";
import { AvailableModel } from "../types/models";
import { Home, Hospital } from "lucide-react";

interface Conversation {
  id: number;
  title: string;
  url: string;
  model: AvailableModel;
  icon?: React.ReactNode;
}

const useConversations = () => {
  const [conversations] = useState<Conversation[]>([
    {
      id: 1,
      title: "There was a random...",
      url: "/abc",
      model: "gpt-4o",
    },
    {
      id: 2,
      title: "If you only get one...",
      url: "/abcd",
      model: "deepseek-reasoner",
    },
    {
      id: 3,
      title: "When are you playing...",
      url: "/abcde",
      model: "deepseek-reasoner",
    },
  ]);

  const conversationsWithIcon = conversations.map((conversation) => ({
    ...conversation,
    icon: conversation.model === "gpt-4o" ? Hospital : Home,
  }));

  return { conversations: conversationsWithIcon };
};

export default useConversations;
