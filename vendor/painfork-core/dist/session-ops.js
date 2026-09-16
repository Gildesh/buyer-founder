import { SessionSchema } from "./schemas.js";
function randomId() {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}
export function createSession() {
    const now = new Date().toISOString();
    return {
        id: randomId(),
        pains: [],
        shifts: [],
        pickedShiftIds: [],
        createdAt: now,
        updatedAt: now,
    };
}
export function touchSession(session) {
    return { ...session, updatedAt: new Date().toISOString() };
}
export function parseSession(raw) {
    return SessionSchema.parse(raw);
}
export function setContext(session, context) {
    return touchSession({ ...session, context });
}
export function addPain(session, pain) {
    if (session.pains.some((p) => p.id === pain.id)) {
        throw new Error(`Pain already exists: ${pain.id}`);
    }
    return touchSession({ ...session, pains: [...session.pains, pain] });
}
export function addCustomPain(session, statement, grain, category) {
    const id = `custom-${randomId().slice(0, 8)}`;
    return addPain(session, {
        id,
        statement,
        grain,
        category,
        suggestedEvidence: "Describe what you or the buyer observed.",
        validated: false,
    });
}
export function mergeExcavatedPains(session, excavated) {
    const existingIds = new Set(session.pains.map((p) => p.id));
    const newPains = excavated.filter((p) => !existingIds.has(p.id));
    return touchSession({ ...session, pains: [...session.pains, ...newPains] });
}
export function updatePains(session, pains) {
    return touchSession({ ...session, pains });
}
export function setShifts(session, shifts) {
    return touchSession({ ...session, shifts });
}
export function pickShift(session, shiftId) {
    const shift = session.shifts.find((s) => s.id === shiftId);
    if (!shift) {
        throw new Error(`Shift not found: ${shiftId}`);
    }
    if (session.pickedShiftIds.includes(shiftId)) {
        return session;
    }
    return touchSession({
        ...session,
        pickedShiftIds: [...session.pickedShiftIds, shiftId],
    });
}
export function unpickShift(session, shiftId) {
    return touchSession({
        ...session,
        pickedShiftIds: session.pickedShiftIds.filter((id) => id !== shiftId),
    });
}
export function getPickedShifts(session) {
    if (session.pickedShiftIds.length === 0) {
        return session.shifts.slice(0, 1);
    }
    return session.shifts.filter((s) => session.pickedShiftIds.includes(s.id));
}
//# sourceMappingURL=session-ops.js.map