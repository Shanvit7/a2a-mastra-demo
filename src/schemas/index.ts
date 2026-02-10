import { z } from "zod";

/**
 * A2A Tool Schemas
 * Schemas for Agent-to-Agent communication tools
 */

/**
 * Schema for getting agent card input
 */
export const getAgentCardInputSchema = z.object({
  agentId: z
    .string()
    .describe(
      "The ID of the agent to get information about eg: hotel-booking-agent (in kebab-case)",
    ),
});

/**
 * Schema for getting agent card output
 */
export const getAgentCardOutputSchema = z.object({
  agentCard: z.any().describe("The agent card containing agent information"),
});

/**
 * Schema for sending message input
 */
export const sendMessageInputSchema = z.object({
  to: z.string().describe("The ID of the agent to send the message to"),
  content: z.string().describe("The message content to send"),
});

/**
 * Schema for sending message output
 */
export const sendMessageOutputSchema = z.object({
  success: z.boolean().describe("Whether the message was sent successfully"),
  message: z.string().optional().describe("Response message or status"),
});

/**
 * Schema for creating task input
 */
export const createTaskInputSchema = z.object({
  agentId: z.string().describe("The ID of the agent to assign the task to"),
  taskType: z
    .string()
    .describe(
      "The type of task (e.g., 'processData', 'bookHotel', 'bookFlight')",
    ),
  payload: z
    .record(z.any(), z.any())
    .describe(
      "Task payload. For hotel-booking-agent: location (required), check_in, check_out (YYYY-MM-DD). For flight-booking-agent: origin, destination.",
    ),
  content: z
    .string()
    .optional()
    .describe("Optional message content describing the task"),
});

/**
 * Schema for creating task output
 */
export const createTaskOutputSchema = z.object({
  success: z.boolean().describe("Whether the task was created successfully"),
  response: z.any().describe("The response from sending the task message"),
  message: z.string().describe("Status message"),
});

/**
 * Schema for getting task input
 */
export const getTaskInputSchema = z.object({
  agentId: z.string().describe("The ID of the agent that has the task"),
  taskId: z.string().describe("The ID of the task to check"),
});

/**
 * Schema for getting task output
 */
export const getTaskOutputSchema = z.object({
  task: z.any().describe("The task object with status and results"),
});
