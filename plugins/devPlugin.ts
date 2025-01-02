import {createLogger, ViteDevServer} from "vite";
import {createRequire} from 'module'

const require = createRequire(import.meta.url);

export let devPlugin = () => {
    return {
        name: "dev-plugin",
        configureServer(server: ViteDevServer) {
            require("esbuild").buildSync({
                entryPoints: ["./src/main/mainEntry.ts"],
                bundle: true,
                platform: "node",
                outfile: "./dist/mainEntry.js",
                external: ["electron"],
            });
            if (server.httpServer === null) return;
            server.httpServer.once("listening", () => {
                let {spawn} = require("child_process");
                let addressInfo = server.httpServer!.address();
                if (addressInfo === null || typeof addressInfo === "string") return;
                let httpAddress = `http://localhost:${addressInfo.port}`;
                let electronProcess = spawn(require("electron").toString(), ["./dist/mainEntry.js", httpAddress], {
                    cwd: process.cwd(),
                    stdio: "inherit",
                });
                electronProcess.on("close", () => {
                    server.close();
                    process.exit();
                });
            });
        },
    };
};


export let getReplacer = () => {
    let externalModels = ["os", "fs", "path", "events", "child_process", "crypto", "http", "buffer", "url", "better-sqlite3", "knex"];
    let result: Record<string, () => { find: RegExp; code: string }> = {};
    for (let item of externalModels) {
        result[item] = () => ({
            find: new RegExp(`^${item}$`),
            code: `const ${item} = require('${item}');export { ${item} as default }`,
        });
    }
    result["electron"] = () => {
        let electronModules = ["clipboard", "ipcRenderer", "nativeImage", "shell", "webFrame"].join(",");
        return {
            find: new RegExp(`^electron$`),
            code: `const {${electronModules}} = require('electron');export {${electronModules}}`,
        };
    };
    return result;
};
