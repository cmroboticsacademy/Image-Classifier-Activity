import { keyboardOverride } from './unity_api';

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      e.preventDefault();
      keyboardOverride('pressed_up');
      break;
    case 'ArrowDown':
      e.preventDefault();
      keyboardOverride('pressed_down');
      break;
    case 'ArrowLeft':
      e.preventDefault();
      keyboardOverride('pressed_left');
      break;
    case 'ArrowRight':
      e.preventDefault();
      keyboardOverride('pressed_right');
      break;
    default:
      break;
  }
});

document.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      e.preventDefault();
      keyboardOverride('released_up');
      break;
    case 'ArrowDown':
      e.preventDefault();
      keyboardOverride('released_down');
      break;
    case 'ArrowLeft':
      e.preventDefault();
      keyboardOverride('released_left');
      break;
    case 'ArrowRight':
      e.preventDefault();
      keyboardOverride('released_right');
      break;
    default:
      break;
  }
});
