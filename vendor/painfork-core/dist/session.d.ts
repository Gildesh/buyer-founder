import { createSession, parseSession, touchSession, setContext, addPain, addCustomPain, mergeExcavatedPains, updatePains, setShifts, pickShift, unpickShift, getPickedShifts } from "./session-ops.js";
export declare const DEFAULT_SESSION_DIR: string;
export declare const DEFAULT_SESSION_FILE: string;
export declare function getSessionPath(customPath?: string): string;
export declare function loadSession(path?: string): import("./types.js").Session;
export declare function saveSession(session: import("./types.js").Session, path?: string): void;
export { createSession, parseSession, touchSession, setContext, addPain, addCustomPain, mergeExcavatedPains, updatePains, setShifts, pickShift, unpickShift, getPickedShifts, };
//# sourceMappingURL=session.d.ts.map