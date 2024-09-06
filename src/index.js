import path from "path";
import {fileURLToPath} from "url";
import fs from "fs";
import {create_server} from "./moduels/server.js";
import {panic} from "./helpers/panic.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const readJson = filePath => JSON.parse(fs.readFileSync(filePath, 'utf-8'))
const readText = filePath => fs.readFileSync(filePath, 'utf-8')

globalThis.rootPath = path.dirname(__dirname)
globalThis.appPath = __dirname
globalThis.config = readJson(path.resolve(rootPath, "config.json"))
globalThis.pkg = readJson(path.resolve(rootPath, "package.json"))
globalThis.whiteList = readText(path.resolve(rootPath, "whitelist.txt")).split(/\r?\n/)

console.log(config)

try {
    await create_server()
} catch (e) {
    panic(e.message)
}
