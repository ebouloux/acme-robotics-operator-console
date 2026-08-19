export type CommandStatus = "queued" | "processing" | "confirmed" | "failed" | "cancelled";

export type RobotCommand = {
  id: string;
  robotId: string;
  operatorId: string;
  routeId: string;
  submittedAt: string;
  status: CommandStatus;
  priority: "standard" | "supervisor";
};

export type QueueSummary = {
  robotId: string;
  queuedCount: number;
  processingCount: number;
  latestStatus: CommandStatus | "none";
  estimatedWaitSeconds: number;
  hasPotentialConflict: boolean;
};

export function summarizeQueue(robotId: string, commands: RobotCommand[]): QueueSummary {
  const robotCommands = commands.filter((command) => command.robotId === robotId);
  const queuedCount = robotCommands.filter((command) => command.status === "queued").length;
  const processingCount = robotCommands.filter((command) => command.status === "processing").length;
  const latest = robotCommands.at(-1);

  return {
    robotId,
    queuedCount,
    processingCount,
    latestStatus: latest?.status ?? "none",
    estimatedWaitSeconds: queuedCount * 8 + processingCount * 12,
    hasPotentialConflict: hasConflictingRoutes(robotCommands)
  };
}

export function hasConflictingRoutes(commands: RobotCommand[]): boolean {
  const activeCommands = commands.filter(
    (command) => command.status === "queued" || command.status === "processing"
  );
  const uniqueRoutes = new Set(activeCommands.map((command) => command.routeId));
  return activeCommands.length > 1 && uniqueRoutes.size > 1;
}

export function shouldBlockDuplicateCommand(
  nextCommand: RobotCommand,
  existingCommands: RobotCommand[]
): boolean {
  return existingCommands.some(
    (command) =>
      command.robotId === nextCommand.robotId &&
      command.operatorId === nextCommand.operatorId &&
      command.routeId === nextCommand.routeId &&
      (command.status === "queued" || command.status === "processing")
  );
}
