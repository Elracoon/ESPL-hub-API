import { init as configurationDefaultInit } from "./default-config.js";

export function init() {
    return new Promise(async (resolve) => {
        await configurationDefaultInit();
        return resolve("ok");
    });
}
