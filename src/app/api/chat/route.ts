import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { deepseek } from "@ai-sdk/deepseek";

export async function POST(req: Request) {
  const { messages, data } = await req.json();
  const { assistant } = data;

  const model =
    assistant === "deepseek-reasoner"
      ? deepseek("deepseek-reasoner")
      : openai("gpt-4o");

  const result = await streamText({
    model,
    system: "You are a helpful assistant.",
    messages,
  });

  return result.toDataStreamResponse();
}
