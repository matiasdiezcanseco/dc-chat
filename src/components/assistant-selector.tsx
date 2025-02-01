import React from "react";
import { Combobox } from "./ui/combobox";
import { useSelectAssistant } from "@/lib/hooks/use-select-assistant";

export const AssistantSelector = () => {
  const { setAssistant } = useSelectAssistant();

  return (
    <Combobox
      onSelect={(value) => setAssistant(value)}
      defaultValue="gpt-4"
      options={[
        { value: "gpt-4", label: "Chat GPT-4" },
        { value: "deepseek-reasoner", label: "DeepSeek R1" },
      ]}
    />
  );
};
