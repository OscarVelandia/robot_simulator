import { useEffect, useState } from 'react';
import { Grid } from './components/Grid';
import { Direction, GRID_SIZE } from './constants';

import styles from './RobotSimulator.module.css';

// =========================== State And Actions =========================== //

class RobotState {
  public x = 0; //Column
  public y = 0; // Row
  public facing = Direction.NORTH;
}

const moveRobotForward = (robot: RobotState): RobotState => {
  const { x, y, facing } = robot;

  const newPosition = (() => {
    switch (facing) {
      case Direction.NORTH:
        return { x, y: Math.max(y - 1, 0) };
      case Direction.EAST:
        return { x: Math.min(x + 1, GRID_SIZE - 1), y };
      case Direction.SOUTH:
        return { x, y: Math.min(y + 1, GRID_SIZE - 1) };
      case Direction.WEST:
        return { x: Math.max(x - 1, 0), y };
      default:
        return { x, y };
    }
  })();

  return { ...robot, ...newPosition };
};

const rotateRobotLeft = (robot: RobotState): RobotState => {
  return {
    ...robot,
    facing: (robot.facing + 3) % 4,
  };
};

const rotateRobotRight = (robot: RobotState): RobotState => {
  return {
    ...robot,
    facing: (robot.facing + 1) % 4,
  };
};

const getDirectionName = (facing: Direction): string => {
  switch (facing) {
    case Direction.NORTH:
      return 'NORTH';
    case Direction.EAST:
      return 'EAST';
    case Direction.SOUTH:
      return 'SOUTH';
    case Direction.WEST:
      return 'WEST';
    default:
      throw new Error (`${facing} facing direction is incorrect`);
  }
};

// ============================================================================

export function RobotSimulator() {
  const [robot, setRobot] = useState(new RobotState());

  const handleKeyPress = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
        setRobot((prevRobot) => moveRobotForward(prevRobot));
        break;
      case 'ArrowLeft':
        setRobot((prevRobot) => rotateRobotLeft(prevRobot));
        break;
      case 'ArrowRight':
        setRobot((prevRobot) => rotateRobotRight(prevRobot));
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleMoveForward = () => setRobot((prevRobot) => moveRobotForward(prevRobot));
  const handleRotateLeft = () => setRobot((prevRobot) => rotateRobotLeft(prevRobot));
  const handleRotateRight = () => setRobot((prevRobot) => rotateRobotRight(prevRobot));

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <h1 className={styles.title}>Robot Simulator</h1>
        <Grid x={robot.x} y={robot.y} />
        <ul className={styles.positionInfo}>
          <li><b>Position:</b> ({robot.x}, {robot.y})</li>
          <li><b>Facing:</b> {getDirectionName(robot.facing)}</li>
        </ul>
      </div>
      <div className={styles.rightPanel}>
        <h2>Controls</h2>
        <div className={styles.description}>
          Use the keyboard arrow keys to control the robot:
          <ul className={styles.descriptionList}>
            <li><b>Arrow Up</b>: Move the robot forward in the direction it is facing.</li>
            <li><b>Arrow Left</b>: Rotate the robot left (counter-clockwise).</li>
            <li><b>Arrow Right</b>: Rotate the robot right (clockwise).</li>
          </ul>
        </div>
        <h2>Alternatively, use these buttons:</h2>
        <div className={styles.buttonsContainer}>
          <button onClick={handleMoveForward}>Move Forward</button>
          <button onClick={handleRotateLeft}>Rotate Left</button>
          <button onClick={handleRotateRight}>Rotate Right</button>
        </div>
      </div>
    </div>
  );
}
