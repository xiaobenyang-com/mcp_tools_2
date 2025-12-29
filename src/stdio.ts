#!/usr/bin/env node

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { server, getIsLoading } from './mcp.js';

try {
  console.log("state.isLoading: " + getIsLoading())
  while (!getIsLoading()) {
    setTimeout(() => {
      console.log('500 毫秒后执行');
    }, 500);
  }


  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log(`MCP server is running on stdio.`);
} catch (error) {
  console.error(`Failed to run MCP server on stdio.`);
}
