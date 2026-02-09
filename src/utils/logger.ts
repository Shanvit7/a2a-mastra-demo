// LOGGER
import { LogLevel, PinoLogger } from "@mastra/loggers";
// CONSTANTS
import { LOGGER_LEVEL } from "@/utils/constants";

const logger = new PinoLogger({
  name: "Travel Receptionist Agent",
  level: LOGGER_LEVEL as LogLevel,
});

export default logger;
