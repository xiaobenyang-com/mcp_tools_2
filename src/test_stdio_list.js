#!/usr/bin/env node

import {FastMCP} from "fastmcp";
import {z} from "zod";

let apiKey = process.env.XBY_APIKEY;
let mcpId = process.env.MCP_ID;
let mcpDescJson = process.env.MCP_DESC_JSON;

const calcXiaoBenYangApi = async function (fullArgs) {
    // 发起 GET 请求
    let response = await fetch('https://mcp.xiaobenyang.com/api', {
        method: 'POST',
        headers: {
            'XBY-APIKEY': apiKey,
            'func': fullArgs.toolName,
            'mcpid': mcpId
        },
        body: new URLSearchParams(fullArgs)
    });
    return await response.text();
}


const initServer = function (mcpDesc) {
    const apiDescList = mcpDesc.tools;

    const server = new FastMCP({
        name: 'test',
        version: mcpDesc.version,
    });

    const addToolXiaoBenYangApi = function (title, desc, params) {
        server.addTool({
            name: title,
            description: desc,
            parameters: params,
            execute: async (args) => {
                // 合并用户输入 args 和工具专属 aid
                const fullArgs = {...args, toolName: title};
                return calcXiaoBenYangApi(fullArgs);
            }
        });
    }

    for (const apiDesc of apiDescList) {
        let inputSchema = JSON.parse(apiDesc.inputSchema);
        const zodDict = {};

        // 遍历 properties 中的每个字段
        Object.entries(inputSchema.properties).forEach(([name, propConfig]) => {
            let zodType;
            // 根据 type 映射 Zod 类型（可扩展更多类型）
            switch (propConfig.type) {
                case 'string':
                    zodType = z.string();
                    break;
                case 'number':
                    zodType = z.number();
                    break;
                case 'boolean':
                    zodType = z.boolean();
                    break;
                case 'integer':
                    zodType = z.bigint();
                    break;
                case 'array':
                    zodType = z.array(z.any());
                    break;
                case 'object':
                    zodType = z.object(z.any());
                    break;
                default:
                    zodType = z.any();
            }

            // 如果字段在 required 中，设置为必填
            if (inputSchema.required?.includes(name)) {
                zodDict[name] = zodType;
            } else {
                zodDict[name] = zodType.optional();
            }
        });

        addToolXiaoBenYangApi(
            apiDesc.name,
            apiDesc.description ? apiDesc.description : apiDesc.title,
            z.object(zodDict));
    }

    server.start({
        transportType: "stdio",
    });
}

if (mcpDescJson) {
    let mcpDesc = JSON.parse(mcpDescJson)
    initServer(mcpDesc);
} else {
    fetch('https://mcp.xiaobenyang.com/getMcpDesc?mcpId=' + mcpId, {
        method: 'GET',
    }).then((res) => {
        if (!res.ok) throw new Error(`请求失败：${res.status}`);
        return res.json(); // 解析响应体为 JSON（假设返回 { apiDescList: [...] }）
    })
        .then((data) => {
            initServer(data);
        });
}