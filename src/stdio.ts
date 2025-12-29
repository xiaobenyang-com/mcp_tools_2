#!/usr/bin/env node

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { server, isLoading } from './mcp.js';

try {
  while (!isLoading) {
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
