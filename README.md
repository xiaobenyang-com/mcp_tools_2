## 在线新闻
本MCP服务封装了新闻相关工具。

## 工具列表

本MCP服务封装了新闻相关工具，可让模型通过标准化接口调用以下功能：

| 工具名称	 | 描述                 |
|-------|--------------------|
| aa    | 	xxxx（例如：实时热点新闻查询） |
| bb    | 	yyy（例如：新闻内容关键词提取） |


## 前置需求 ｜ Prerequisite
Node.js 22 版本或以上。

Node.js 22 or above.

## 开始使用 ｜ Start

###  使用 Streamable HTTP 启动 | Start by Streamable HTTP transport
```
npm start
```

### 使用 Stdio 启动 ｜ Start by Stdio transport

```
{
  "mcpServers": {
    "xiaobenyang-mcp": {
      "args": [
        "xiaobenyang-mcp@latest"
      ],
      "command": "npx",
      "env": {
        "XBY_APIKEY": "你的实际apikey",
        "LOG_LEVEL": "info",
        "MCP_ID": "1804087353852938"
      }
    }
  }
}
```

### 使用 HTTP 启动 ｜ Start by HTTP transport
```
{
  "mcpServers": {
    "xiaobenyang-mcp-stream": {
      "env": {
        "XBY_APIKEY": "你的实际apikey"
      },
      "type": "streamable_http",
      "url": "https://mcp.xiaobenyang.com/1804087353852938/mcp"
    }
  }
}
```

### 使用 SSE 启动 ｜ Start by SSE transport
```
{
  "mcpServers": {
    "xiaobenyang-sse": {
      "env": {
        "XBY_APIKEY": "<YOUR-XBY-APIKEY>"
      },
      "type": "sse",
      "url": "https://mcp.xiaobenyang.com/1804087353852938/sse?XBY-APIKEY=<YOUR-XBY-APIKEY>"
    }
  }
}
```



##  Inspector
npx @modelcontextprotocol/inspector npx xiaobenyang-mcp


```
{
  "mcpServers": {
    "xiaobenyang-mcp-stream": {   
      "env": {
        "YOUR_XBY_APIKEY": "你的实际apikey"
      },
      "type": "streamable_http",
      "url": "https://mcp.xiaobenyang.com/<MCP_ID>/mcp?XBY-APIKEY=<YOUR_XBY_APIKEY>"
    }
  }
}
```

```json
{
  "mcpServers": {
    "xiaobenyang-streamable": {
      "env": {
        "YOUR-XBY-APIKEY": "xby api key"
      },
      "type": "streamable_http",
      "url": "https://mcp.xiaobenyang.com/1804087353852938/mcp?XBY-APIKEY=<YOUR-XBY-APIKEY>"
    }
  }
}
```