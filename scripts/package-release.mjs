import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { copyFile, readFile, rm } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const bundleName = "DesktopItems.rightmenuplugin";
const packageJSON = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
const versionedName = `RightMenu-DesktopItems-${packageJSON.version}.zip`;
const stableName = "RightMenu-DesktopItems.zip";
const versionedPath = join(dist, versionedName);
const stablePath = join(dist, stableName);

await rm(versionedPath, { force: true });
await rm(stablePath, { force: true });

execFileSync("zip", ["-X", "-q", "-r", versionedName, bundleName], {
  cwd: dist,
  stdio: "inherit"
});
await copyFile(versionedPath, stablePath);

const archive = await readFile(versionedPath);
const sha256 = createHash("sha256").update(archive).digest("hex");

console.log(`${versionedPath}\n${stablePath}\nSHA-256 ${sha256}`);
