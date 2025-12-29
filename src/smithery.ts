import {z} from "zod";
import {getServer} from "./mcp.js";

export const configSchema = z.object({
})

export default function createServer({config,}: { config: z.infer<typeof configSchema> }) {
    let isLoading = true;
    let curServer;
    getServer().then(serverInstance => {
        curServer = serverInstance.server;
        isLoading = false;
    });

    while (isLoading) {
        setTimeout(() => {
            console.log('500 毫秒后执行');
        }, 500);
    }

    return curServer;
}
