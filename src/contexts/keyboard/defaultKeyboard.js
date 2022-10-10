export const DEFAULT_KEYBOARD_LAYERS = {
  'basic-layer': {
    rows: [
      [
        {label: '7', insert: '7'},
        {label: '8', insert: '8'},
        {label: '9', insert: '9'},
        {label: '+', insert: ' + '},
        {type: 'separator w5'},
        {label: '(', insert: '('},
        {label: ')', insert: ')'},
      ],
      [
        {label: '4', insert: '4'},
        {label: '5', insert: '5'},
        {label: '6', insert: '6'},
        {label: '-', insert: ' - '},
        {type: 'separator w10'},
        {type: 'separator w5'},
        {latex: '\\sqrt{#?}'},
      ],
      [
        {label: '1', insert: '1'},
        {label: '2', insert: '2'},
        {label: '3', insert: '3'},
        {label: '*', insert: ' * '},
        {type: 'separator w5'},
        {type: 'separator w10'},
        {
          type: 'action',
          label: 'x',
          command: 'deleteBackward',
        },
      ],
      [
        {type: 'separator w10'},
        {label: '0', insert: '0'},
        {label: ',', insert: ','},
        // TODO: Fix parse \ and as latex :
        {type: 'small', latex: '\\frac{#?}{#?}'},
        {type: 'separator w5'},
        {
          type: 'action',
          label: 'ᐸ',
          command: 'moveToPreviousChar',
        },
        {
          type: 'action',
          label: 'ᐳ',
          command: 'moveToNextChar',
        },
      ],
    ],
  },
};

export const DEFAULT_KEYBOARDS = {
  basic: {
    label: 'Basic',
    layer: 'basic-layer',
  },
};
