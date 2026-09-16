import { createSession, parseSession, touchSession, setContext, addPain, addCustomPain, mergeExcavatedPains, updatePains, setShifts, pickShift, unpickShift, getPickedShifts } from "./session-ops.js";
import type { Session } from "./types.js";
export declare const BROWSER_SESSION_KEY = "painfork-session";
export declare function loadBrowserSession(): Session;
export declare function saveBrowserSession(session: Session): void;
export declare function resetBrowserSession(): Session;
export { createSession, parseSession, touchSession, setContext, addPain, addCustomPain, mergeExcavatedPains, updatePains, setShifts, pickShift, unpickShift, getPickedShifts, };
//# sourceMappingURL=browser-session.d.ts.map