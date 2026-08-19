import assert from "node:assert/strict";
import { hasConflictingRoutes, shouldBlockDuplicateCommand, summarizeQueue, type RobotCommand } from "../src/commandQueue.ts";

const baseCommand: RobotCommand = {
  id: "cmd-1",
  robotId: "robot-7",
  operatorId: "operator-a",
  routeId: "route-north",
  submittedAt: new Date().toISOString(),
  status: "queued",
  priority: "standard"
};

const commands: RobotCommand[] = [
  baseCommand,
  {
    ...baseCommand,
    id: "cmd-2",
    operatorId: "operator-b",
    routeId: "route-south",
    status: "processing"
  }
];

const summary = summarizeQueue("robot-7", commands);
assert.equal(summary.queuedCount, 1);
assert.equal(summary.processingCount, 1);
assert.equal(summary.hasPotentialConflict, true);
assert.equal(hasConflictingRoutes(commands), true);
assert.equal(shouldBlockDuplicateCommand(baseCommand, commands), true);

console.log("commandQueue tests passed");
