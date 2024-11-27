// BurgerMenu.tsx
import * as React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Button, BUTTON_VARIANTS } from '../Button/Button';
import Modal from '../Modal/Modal';
import CircleTimer from '../../common/Timers/CircleTimer/CircleTimer';
import styles from './BurgerMenu.module.scss';

interface MenuState {
  isOpen: boolean;
}

interface BurgerMenuProps {
  isOpen: boolean;
  onStateChange: (state: MenuState) => void;
  onNewGame: () => void;
  onContinue: () => void;
  onMainMenu: () => void;
  onSettings: () => void;
  onTimer: () => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({
  isOpen,
  onStateChange,
  onNewGame,
  onContinue,
  onMainMenu,
  onSettings,
  onTimer
}: BurgerMenuProps) => {
  const [showTimer, setShowTimer] = React.useState<boolean>(false);

  const handleTimerClick = React.useCallback(() => {
    setShowTimer(true);
    onTimer();
  }, [onTimer]);

  const handleTimerClose = React.useCallback(() => {
    setShowTimer(false);
  }, []);

  const menuStyles = {
    bmBurgerButton: {
      position: 'fixed',
      width: '36px',
      height: '30px',
      left: '36px',
      top: '36px',
      zIndex: '1',
      filter: 'saturate(2)'
    },
    bmBurgerBars: {
      background: '#03564a'
    },
    bmBurgerBarsHover: {
      background: '#03564a'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px',
      right: '24px',
      top: '24px',
      filter: 'saturate(2)'
    },
    bmCross: {
      background: '#03564a'
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%',
      width: '300px',
      top: '0',
      left: '0',
      zIndex: '1'
    },
    bmMenu: {
      background: '#03564a',
      padding: '0',
      fontSize: '1.15em',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    },
    bmMorphShape: {
      fill: '#03564a'
    },
    bmItemList: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      margin: '0',
      padding: '0'
    },
    bmItem: {
      display: 'block',
      width: '100%',
      outline: 'none'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.7)',
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      zIndex: '1'
    }
  };

  const topSection = {
    padding: '4em 1rem 1rem',
    display: 'flex',
    flexDirection: 'column' as const
  };

  const bottomSection = {
    background: '#046d5f',
    padding: '1em 1rem 1rem',
    marginTop: 'auto',
    height: '50%',
    width: '100%'
  };

  return (
    <>
      <Menu
        isOpen={isOpen}
        onStateChange={onStateChange}
        styles={menuStyles}
        pageWrapId="page-wrap"
        outerContainerId="outer-container"
        width="300"
        crossButtonClassName={styles.crossBtn}
      >
        <div style={topSection}>
          <div className={styles.buttonItem}>
            <Button
              variant={BUTTON_VARIANTS.NEW_GAME}
              onClick={onNewGame}
            />
          </div>
          <div className={styles.buttonItem}>
            <Button
              variant={BUTTON_VARIANTS.CONTINUE}
              onClick={onContinue}
            />  
          </div>
          <div className={styles.buttonItem}>
            <Button
              variant={BUTTON_VARIANTS.MAIN_MENU}
              onClick={onMainMenu}
            />
          </div>
          <div className={styles.buttonItem}>
            <Button
              variant={BUTTON_VARIANTS.SETTINGS}
              onClick={onSettings}
            />
          </div>
        </div>
        <div style={bottomSection} className={styles.bottomSectionAnimated}>
          <div className={styles.buttonItem}>
            <Button
              variant={BUTTON_VARIANTS.TIMER}
              onClick={handleTimerClick}
            />
          </div>
        </div>
      </Menu>
      {showTimer && (
        <Modal
          onClose={handleTimerClose}
          block={null}
          categoryName=""
          modeComponent={() => null}
          timerState={{ timerStarted: false, timerEnded: false }}
          timerHandlers={{ startTimer: () => {}, endTimer: () => {}, resetTimer: () => {} }}
          answerState={{ showAnswer: false }}
          answerHandlers={{ showAnswer: () => {}, hideAnswer: () => {} }}
          onSelectCategory={() => {}}
          isBlockUsed={false}
          warningMessage={null}
          showTimer={true}
          timerDuration={30}
        >
          <CircleTimer
            duration={30}
            onComplete={handleTimerClose}
          />
        </Modal>
      )}
    </>
  );
};

export default BurgerMenu;