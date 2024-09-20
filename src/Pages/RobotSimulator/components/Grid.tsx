import { GRID_SIZE } from '../constants';

import styles from './Grid.module.css';

interface GridProps {
  x: number;
  y: number;
}

export function Grid({ x, y }: GridProps) {
  return (
    <div className={styles.grid}>
      {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
        const row = Math.floor(index / GRID_SIZE);
        const col = index % GRID_SIZE;

        return (
          <div
            key={index}
            className={`${styles.gridItem} ${row === y && col === x ? styles.robot : ''}`}
          >
            {row === y && col === x && '🤖'}
          </div>
        );
      })}
    </div>
  );
}
