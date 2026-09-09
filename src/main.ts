import type { JSONValue } from "../types/rightmenu-plugin-api-v1.3.js";

globalThis.rightMenuPlugin = Object.freeze({
  run(actionID: string, _input: JSONValue): JSONValue {
    if (actionID !== "toggle-visibility") {
      throw new Error(`unsupported action: ${actionID}`);
    }
    return RightMenu.call("desktopItems.toggleVisibility", {});
  }
});
