import type { Context, Pain, ParadigmShift, Session } from "./types.js";
export declare function createSession(): Session;
export declare function touchSession(session: Session): Session;
export declare function parseSession(raw: unknown): Session;
export declare function setContext(session: Session, context: Context): Session;
export declare function addPain(session: Session, pain: Pain): Session;
export declare function addCustomPain(session: Session, statement: string, grain: Pain["grain"], category: string): Session;
export declare function mergeExcavatedPains(session: Session, excavated: Pain[]): Session;
export declare function updatePains(session: Session, pains: Pain[]): Session;
export declare function setShifts(session: Session, shifts: ParadigmShift[]): Session;
export declare function pickShift(session: Session, shiftId: string): Session;
export declare function unpickShift(session: Session, shiftId: string): Session;
export declare function getPickedShifts(session: Session): ParadigmShift[];
//# sourceMappingURL=session-ops.d.ts.map