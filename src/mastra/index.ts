// CORE
import { Mastra } from "@mastra/core/mastra";
// LOGGER
import { PinoLogger } from "@mastra/loggers";
// AGENTS
import travelReceptionistAgent from "@/mastra/agents";
// TYPES
import { LogLevel } from "@mastra/loggers";
// CONSTANTS
import { TRAVEL_RECEPTIONIST_AGENT_ID, LOGGER_LEVEL } from "@/utils/constants";

export const mastra = new Mastra({
  agents: { [TRAVEL_RECEPTIONIST_AGENT_ID]: travelReceptionistAgent },
  logger: new PinoLogger({
    name: "Mastra",
    level: LOGGER_LEVEL as LogLevel,
  }),
});
