import { execFileSync } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const hostRoot = resolve(root, "../../RightMenu");
const packageRoot = join(root, "dist/DesktopItems.rightmenuplugin");
const publicKey = (await readFile(join(root, "publisher-public-key.txt"), "utf8")).trim();
const swift = ["run", "--package-path", hostRoot, "rightmenu-pluginctl"];

execFileSync("swift", [
  ...swift, "validate-signed", packageRoot,
  "rightmenu-desktop-items-2026-01", publicKey
], { stdio: "inherit" });

const catalogRoot = await mkdtemp(join(tmpdir(), "rightmenu-desktop-items-catalog-"));
try {
  const installed = execFileSync("swift", [
    ...swift, "install-signed", packageRoot,
    "rightmenu-desktop-items-2026-01", publicKey,
    "--root", catalogRoot
  ], { encoding: "utf8" });
  process.stdout.write(installed);
  if (!installed.includes("grants=desktopItems.toggleVisibility")) {
    throw new Error("Desktop Items was not ready immediately after signed import");
  }
} finally {
  await rm(catalogRoot, { recursive: true, force: true });
}

const output = execFileSync("swift", [
  ...swift, "run", packageRoot, "toggle-visibility",
  "--grant", "desktopItems.toggleVisibility",
  "--runner", join(hostRoot, ".build/debug/RightMenuPluginRunner")
], { encoding: "utf8" });
if (JSON.parse(output).hidden !== true) {
  throw new Error("host did not accept the desktop visibility capability");
}
console.log("RightMenu host signature and Desktop Items capability verification passed");
