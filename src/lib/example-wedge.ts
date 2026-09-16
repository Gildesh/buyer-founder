import {
  applyExampleToSession,
  buildWedge,
  createSession,
  forkAll,
  getPickedShifts,
  setShifts,
  type Wedge,
} from "@painfork/core/browser";

const EXAMPLE_ID = "ex-as400-slow-modernize";

export function buildExampleWedge(): Wedge {
  const applied = applyExampleToSession(createSession(), EXAMPLE_ID);
  const session = setShifts(applied, forkAll(applied.pains, applied.context));
  if (!session.context) {
    throw new Error("Example session missing context.");
  }
  return buildWedge(session.context, session.pains, getPickedShifts(session));
}
