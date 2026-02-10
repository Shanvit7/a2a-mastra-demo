import dotenv from "dotenv";

dotenv.config();

export const TRAVEL_RECEPTIONIST_AGENT_ID = "travel-receptionist-agent";
export const LOGGER_LEVEL = process.env.LOGGER_LEVEL ?? "info";

// A2A Configuration
export const A2A_SERVER_URL = process.env.A2A_SERVER_URL ?? "";
