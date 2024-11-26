import QAMode from '../../../features/Game/GameModes/QAMode/QAMode';
import SelectionMode from '../../../features/Game/GameModes/SelectionMode/SelectionMode';
import type { GameModeComponent, GameModeConfig } from '../../../../types/gameModes.types';

class GameModeFactory {
  private configs: Map<number, GameModeConfig> = new Map();

  registerMode(config: GameModeConfig): void {
    if (this.configs.has(config.id)) {
      throw new Error(`Игровой режим с id ${config.id} уже зарегистрирован`);
    }
    this.configs.set(config.id, config);
  }

  getMode(id: number | null): GameModeComponent | null {
    if (id === null) return null;
    const config = this.configs.get(id);
    return config ? config.component : null;
  }

  initializeModes(): void {
    this.registerMode({
      id: 1,
      name: 'Q&A Mode',
      component: QAMode as GameModeComponent,
    });

    this.registerMode({
      id: 2,
      name: 'Selection Mode',
      component: SelectionMode as GameModeComponent,
    });
  }
}

const gameModeFactory = new GameModeFactory();
gameModeFactory.initializeModes();

export { gameModeFactory };