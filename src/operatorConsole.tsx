import { summarizeQueue, type RobotCommand } from "./commandQueue";
import { getOperatorFacingStatus, type RobotStatus } from "./robotStatus";

type OperatorConsoleProps = {
  robot: RobotStatus;
  commands: RobotCommand[];
};

export function OperatorConsole({ robot, commands }: OperatorConsoleProps) {
  const queue = summarizeQueue(robot.robotId, commands);

  return (
    <section aria-label={`Operator console for ${robot.displayName}`}>
      <h2>{robot.displayName}</h2>
      <p>Status: {getOperatorFacingStatus(robot)}</p>
      <p>Queued commands: {queue.queuedCount}</p>
      <p>Processing commands: {queue.processingCount}</p>
      <p>Estimated wait: {queue.estimatedWaitSeconds}s</p>
      {queue.hasPotentialConflict ? (
        <strong role="alert">Potential route conflict detected</strong>
      ) : null}
    </section>
  );
}
