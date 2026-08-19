export type RobotOperationalState = "idle" | "moving" | "blocked" | "manual_override" | "offline";

export type RobotStatus = {
  robotId: string;
  displayName: string;
  currentRouteId?: string;
  operationalState: RobotOperationalState;
  lastHeartbeatAt: string;
};

export function getOperatorFacingStatus(status: RobotStatus): string {
  switch (status.operationalState) {
    case "idle":
      return "Ready for command";
    case "moving":
      return `Following route ${status.currentRouteId ?? "unknown"}`;
    case "blocked":
      return "Blocked — operator attention needed";
    case "manual_override":
      return "Manual override active";
    case "offline":
      return "Offline";
  }
}
