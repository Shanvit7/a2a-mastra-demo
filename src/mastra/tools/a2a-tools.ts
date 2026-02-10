// CORE
import { createTool } from "@mastra/core/tools";
import { MastraClient } from "@mastra/client-js";
// CONSTANTS
import { A2A_SERVER_URL } from "@/utils/constants";
// UTILS
import { createA2AFetch } from "@/utils/a2a-fetch";
import { formatDateWithOffset } from "@/utils/index";
// SCHEMAS
import {
  getAgentCardInputSchema,
  getAgentCardOutputSchema,
  sendMessageInputSchema,
  sendMessageOutputSchema,
  createTaskInputSchema,
  createTaskOutputSchema,
  getTaskInputSchema,
  getTaskOutputSchema,
} from "@/schemas/index";

// Initialize Mastra client with custom fetch for Agno A2A URL format
const mastraClient = A2A_SERVER_URL
  ? new MastraClient({
      baseUrl: A2A_SERVER_URL,
      apiPrefix: "",
      fetch: createA2AFetch(A2A_SERVER_URL),
    })
  : null;

/**
 * Get A2A client for a specific agent
 */
const getA2AClient = (agentId: string) => {
  if (!mastraClient) {
    throw new Error(
      "Mastra client is not configured. Please set A2A_SERVER_URL environment variable.",
    );
  }
  return mastraClient.getA2A(agentId);
};

/**
 * Tool to get information about another agent (agent card)
 */
export const getAgentCardTool = createTool({
  id: "a2a-get-agent-card",
  description:
    "Retrieve information about another agent using A2A protocol. Use this to discover what capabilities another agent has before communicating with it.",
  inputSchema: getAgentCardInputSchema,
  outputSchema: getAgentCardOutputSchema,
  execute: async (context: any) => {
    const agentId = context.context?.agentId;

    if (!agentId || typeof agentId !== "string") {
      throw new Error(
        `agentId is required. Received: ${JSON.stringify(context)}`,
      );
    }

    try {
      const a2aClient = getA2AClient(agentId);
      const agentCard = await a2aClient.getCard();
      return { agentCard };
    } catch (error) {
      throw new Error(
        `Failed to get agent card for ${agentId}: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  },
});

/**
 * Tool to send a message to another agent
 */
export const sendMessageTool = createTool({
  id: "a2a-send-message",
  description:
    "Send a message to another agent using A2A protocol. Use this to communicate with other agents and request their assistance.",
  inputSchema: sendMessageInputSchema,
  outputSchema: sendMessageOutputSchema,
  execute: async (context: any) => {
    const to = context.context?.to;
    const content = context.context?.content;

    if (!to || typeof to !== "string") {
      throw new Error("'to' (agentId) is required.");
    }
    if (!content || typeof content !== "string") {
      throw new Error("'content' is required.");
    }

    try {
      const a2aClient = getA2AClient(to);
      const response = await a2aClient.sendMessage({ content } as any);
      return {
        success: true,
        message: `Message sent successfully to agent ${to}`,
        response,
      };
    } catch (error) {
      throw new Error(
        `Failed to send message to ${to}: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  },
});

/**
 * Tool to create a task for another agent
 */
export const createTaskTool = createTool({
  id: "a2a-create-task",
  description:
    "Create a task for another agent to complete using A2A protocol. Use this when you need another agent to perform a specific action or process data.",
  inputSchema: createTaskInputSchema,
  outputSchema: createTaskOutputSchema,
  execute: async (context: any) => {
    const agentId = context.context?.agentId;
    const payload = context.context?.payload;

    if (!agentId || typeof agentId !== "string") {
      throw new Error("agentId is required.");
    }

    try {
      const a2aClient = getA2AClient(agentId);
      const p = (payload ?? {}) as Record<string, unknown>;
      // Hotel/flight agents expect specific schemas - add defaults for required fields
      const taskPayload = JSON.stringify({
        ...p,
        // HotelSearchParams requires: location, check_in, check_out
        location: p.location ?? p.destination ?? "Unknown",
        check_in: p.check_in ?? p.checkIn ?? formatDateWithOffset(0),
        check_out: p.check_out ?? p.checkOut ?? formatDateWithOffset(2),
        // FlightSearchParams may use: origin, destination
        origin: p.origin ?? p.from,
        destination: p.destination ?? p.to ?? p.location,
      });
      const response = await a2aClient.sendMessage({
        content: taskPayload,
      } as any);
      return {
        success: true,
        response,
        message: `Task created successfully for agent ${agentId}`,
      };
    } catch (error) {
      throw new Error(
        `Failed to create task for agent ${agentId}: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  },
});

/**
 * Tool to get task status from another agent
 */
export const getTaskTool = createTool({
  id: "a2a-get-task",
  description:
    "Get the status and result of a task that was created for another agent. Use this to check the progress and results of a task.",
  inputSchema: getTaskInputSchema,
  outputSchema: getTaskOutputSchema,
  execute: async (context: any) => {
    const agentId = context.context?.agentId;
    const taskId = context.context?.taskId;

    if (!agentId || typeof agentId !== "string") {
      throw new Error("agentId is required.");
    }
    if (!taskId || typeof taskId !== "string") {
      throw new Error("taskId is required.");
    }

    try {
      const a2aClient = getA2AClient(agentId);
      const taskResponse = await a2aClient.getTask({ taskId } as any);
      return { task: taskResponse };
    } catch (error) {
      throw new Error(
        `Failed to get task ${taskId} from agent ${agentId}: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  },
});

// Export all A2A tools
export const a2aTools = [
  getAgentCardTool,
  sendMessageTool,
  createTaskTool,
  getTaskTool,
];
