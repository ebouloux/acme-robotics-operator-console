# Acme Robotics Operator Console

Dummy operator console used to test the Notion AI Product Signal → PRD → Prototype workflow.

The app simulates a warehouse operator UI where robot route commands are queued, processed, confirmed, or failed.

## Prototype target areas

- Command queue visibility
- Operator feedback states
- Duplicate command prevention
- Shift handoff behavior
- Safety-adjacent command conflict handling

## Useful files

- `src/commandQueue.ts` — queue logic and command state transitions
- `src/operatorConsole.tsx` — simplified operator UI component
- `src/robotStatus.ts` — robot status model and helpers
- `tests/commandQueue.test.ts` — lightweight tests for queue behavior
