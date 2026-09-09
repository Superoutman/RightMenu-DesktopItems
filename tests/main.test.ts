import assert from "node:assert/strict";
import test from "node:test";
import type { JSONValue, RightMenuHostV1_3 } from "../types/rightmenu-plugin-api-v1.3.js";

test("Desktop Items delegates the reversible toggle to the host", async () => {
  let receivedCapability = "";
  let receivedRequest: JSONValue = null;
  Object.assign(globalThis, {
    RightMenu: {
      apiVersion: "1.3",
      call(capability: string, request: JSONValue) {
        receivedCapability = capability;
        receivedRequest = request;
        return { hidden: true };
      }
    } satisfies RightMenuHostV1_3
  });
  await import(`../src/main.ts?test=${Date.now()}`);
  assert.deepEqual(globalThis.rightMenuPlugin.run("toggle-visibility", null), { hidden: true });
  assert.equal(receivedCapability, "desktopItems.toggleVisibility");
  assert.deepEqual(receivedRequest, {});
});

test("unknown actions fail closed", async () => {
  assert.throws(() => globalThis.rightMenuPlugin.run("unknown", null), /unsupported action/);
});
