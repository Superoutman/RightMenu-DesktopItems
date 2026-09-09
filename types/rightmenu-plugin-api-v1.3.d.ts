export type JSONValue =
  | null
  | boolean
  | number
  | string
  | JSONValue[]
  | { [key: string]: JSONValue };

export type RightMenuCapabilityV1_3 = "desktopItems.toggleVisibility";

export interface PluginBooleanTitleStateV1_3 {
  capability: string;
  trueTitle: string;
  localizedTrueTitles?: Record<string, string>;
}

export interface RightMenuHostV1_3 {
  readonly apiVersion: "1.3";
  call(
    capability: "desktopItems.toggleVisibility",
    request: Record<string, never>
  ): { hidden: boolean };
  call(capability: string, request: JSONValue): JSONValue;
}

export interface RightMenuPluginV1 {
  run(actionID: string, input: JSONValue): JSONValue;
}

declare global {
  const RightMenu: RightMenuHostV1_3;
  var rightMenuPlugin: RightMenuPluginV1;
}
