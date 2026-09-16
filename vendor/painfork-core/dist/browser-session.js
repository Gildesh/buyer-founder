import { createSession, parseSession, touchSession, setContext, addPain, addCustomPain, mergeExcavatedPains, updatePains, setShifts, pickShift, unpickShift, getPickedShifts, } from "./session-ops.js";
export const BROWSER_SESSION_KEY = "painfork-session";
export function loadBrowserSession() {
    if (typeof localStorage === "undefined") {
        return createSession();
    }
    const raw = localStorage.getItem(BROWSER_SESSION_KEY);
    if (!raw) {
        return createSession();
    }
    try {
        return parseSession(JSON.parse(raw));
    }
    catch {
        return createSession();
    }
}
export function saveBrowserSession(session) {
    if (typeof localStorage === "undefined") {
        return;
    }
    localStorage.setItem(BROWSER_SESSION_KEY, JSON.stringify(touchSession(session)));
}
export function resetBrowserSession() {
    const session = createSession();
    saveBrowserSession(session);
    return session;
}
export { createSession, parseSession, touchSession, setContext, addPain, addCustomPain, mergeExcavatedPains, updatePains, setShifts, pickShift, unpickShift, getPickedShifts, };
//# sourceMappingURL=browser-session.js.map