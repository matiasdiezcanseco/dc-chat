import { useState } from "react";
import { AvailableModel } from "../types/models";

export const useSelectAssistant = () => {
  const [assistant, setAssistant] = useState<AvailableModel>("gpt-4");

  return { assistant, setAssistant };
};
