// CORE
import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
// CONSTANTS
import { TRAVEL_RECEPTIONIST_AGENT_ID } from "@/utils/constants";

const travelReceptionistAgent = new Agent({
  name: TRAVEL_RECEPTIONIST_AGENT_ID,
  id: TRAVEL_RECEPTIONIST_AGENT_ID,
  instructions:
    "You are a professional travel receptionist AI that helps users with their travel plans.",
  description: "AI agent that helps users with their travel plans.",
  model: openai("gpt-4o-mini"),
});

export default travelReceptionistAgent;
