import * as console from "node:console";

export const panic = (msg, ...args) => {
    console.error(msg, ...args);
}