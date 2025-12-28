import {z} from "zod";
import {server, isLoading} from "./mcp.js";

export const configSchema = z.object({
})

export default function createServer({config,}: { config: z.infer<typeof configSchema> }) {

    while (!isLoading) {
        setTimeout(() => {
            console.log('500 毫秒后执行');
        }, 500);
    }

    return server.server;
}
