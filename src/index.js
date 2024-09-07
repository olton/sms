import path from "path";
import {fileURLToPath} from "url";
import fs from "fs";
import {create_server} from "./moduels/server.js";
import {panic} from "./helpers/panic.js";
import {create_sns_client} from "./moduels/sns.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const readJson = filePath => JSON.parse(fs.readFileSync(filePath, 'utf-8'))
const readText = filePath => fs.readFileSync(filePath, 'utf-8')

globalThis.rootPath = path.dirname(__dirname)
globalThis.appPath = __dirname
globalThis.config = readJson(path.resolve(rootPath, "config.json"))
globalThis.pkg = readJson(path.resolve(rootPath, "package.json"))
globalThis.whiteList = readText(path.resolve(rootPath, "whitelist.txt")).split(/\r?\n/)

try {
    await create_sns_client(config)
    await create_server(config)
} catch (e) {
    panic(e.message)
}
