import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import { createSession, parseSession, touchSession, setContext, addPain, addCustomPain, mergeExcavatedPains, updatePains, setShifts, pickShift, unpickShift, getPickedShifts, } from "./session-ops.js";
export const DEFAULT_SESSION_DIR = join(homedir(), ".painfork");
export const DEFAULT_SESSION_FILE = join(DEFAULT_SESSION_DIR, "session.json");
export function getSessionPath(customPath) {
    return customPath ?? DEFAULT_SESSION_FILE;
}
export function loadSession(path) {
    const filePath = getSessionPath(path);
    if (!existsSync(filePath)) {
        return createSession();
    }
    const raw = JSON.parse(readFileSync(filePath, "utf-8"));
    return parseSession(raw);
}
export function saveSession(session, path) {
    const filePath = getSessionPath(path);
    const dir = join(filePath, "..");
    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
    }
    writeFileSync(filePath, JSON.stringify(touchSession(session), null, 2), "utf-8");
}
export { createSession, parseSession, touchSession, setContext, addPain, addCustomPain, mergeExcavatedPains, updatePains, setShifts, pickShift, unpickShift, getPickedShifts, };
//# sourceMappingURL=session.js.map