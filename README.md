# A2A Travel Agent Receptionist Demo

An AI-powered travel agent receptionist demo that connects to an agno agent for hotel and flight booking using A2A (Agent-to-Agent) communication. Built with [Mastra](https://mastra.ai/) framework, this demo showcases how a receptionist agent can seamlessly interact with specialized booking agents to handle travel reservations.

## 🚀 Quick Start

### Prerequisites

- **Node.js**: >= 20.9.0
- **pnpm**: Package manager

### Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd a2a-mastra-demo
```

2. Install dependencies:

```bash
pnpm install
```

3. Configure environment variables:

Create a `.env` file with your configuration:

```
# Mastra Configuration
MASTRA_API_KEY=your-mastra-api-key

# A2A Configuration
AGNO_AGENT_URL=your-agno-agent-url
AGNO_AGENT_API_KEY=your-agno-agent-api-key
```

## 🎯 Features

- **Travel Agent Receptionist**: AI-powered receptionist agent that handles customer inquiries
- **A2A Communication**: Seamless agent-to-agent communication with agno booking agents
- **Hotel Booking**: Integration with agno agent for hotel reservations
- **Flight Booking**: Integration with agno agent for flight reservations
- **Built with Mastra**: Leverages Mastra framework for AI agent orchestration

## 🧪 Development

Start the development server:

```bash
pnpm dev
```

## 🏗️ Build

Build the project for production:

```bash
pnpm build
```

## 🚀 Start Production

Start the production build:

```bash
pnpm start
```

## 📁 Project Structure

```
src/
├── mastra/
│   ├── agents/          # AI agents (receptionist agent)
│   │   └── index.ts    # Agent definitions
│   └── index.ts        # Main Mastra instance
└── utils/
    ├── constants.ts    # Application constants
    └── logger.ts       # Logging utilities
```

## 🛠️ Tech Stack

- **Framework**: [Mastra](https://mastra.ai/) - AI TypeScript framework
- **Language**: TypeScript with ES2022
- **Build Tool**: tsup
- **Package Manager**: pnpm
- **A2A Communication**: Agent-to-Agent protocol for inter-agent communication
- **Integration**: Agno agent for hotel and flight booking
- **Logging**: Pino Logger

## 📝 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm test` - Run tests (currently not implemented)

## 🔌 A2A Integration

This demo showcases Agent-to-Agent (A2A) communication between:

1. **Receptionist Agent**: The main agent that handles customer interactions and inquiries
2. **Agno Agent**: Specialized booking agent for hotel and flight reservations ([a2a-agno-demo](https://github.com/Shanvit7/a2a-agno-demo))

The receptionist agent communicates with the agno agent using A2A protocol to:

- Process hotel booking requests
- Handle flight reservation inquiries
- Coordinate multi-step booking workflows
- Provide seamless customer experience

## 🏗️ Architecture

```
Customer Request
    ↓
Receptionist Agent (Mastra)
    ↓
A2A Communication
    ↓
Agno Agent (Hotel/Flight Booking)
    ↓
Response
    ↓
Customer
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🔗 Links

- [Mastra Documentation](https://mastra.ai/)
- [A2A Protocol Documentation](https://mastra.ai/docs) (check Mastra docs for A2A details)
- [Agno Agents (A2A)](https://github.com/Shanvit7/a2a-agno-demo) - Hotel and flight booking agents called via A2A protocol
