export const DEFAULT_KEYBOARD_LAYERS = {
  'geometry-layer': {
    rows: [
      [
        {latex: '\\vert'},
        {latex: '\\not{\\vert}'},
        {latex: '\\parallel'},
        {latex: '\\bot'},
        {latex: '\\overrightarrow{#@}'},
        {latex: '\\begin{pmatrix}#0\\\\#0\\end{pmatrix}'},
      ],
      [
        {latex: '\\measuredangle'},
        {latex: ';'},
        {latex: '\\longmapsto'},
        {latex: '\\left\\lvert #0 \\right\\rvert'},
        {latex: '\\left\\lvert \\overline{#0} \\right\\rvert'},
        {latex: '\\overline{#@}'},
      ],
      [
        {type: 'separator w20'},
        {type: 'separator w20'},
        {type: 'separator w20'},
        {type: 'separator w20'},
        {
          type: 'action',
          label: 'ᐸ',
          command: ['performWithFeedback', 'moveToPreviousChar'],
        },
        {
          type: 'action',
          label: 'ᐳ',
          command: ['performWithFeedback', 'moveToNextChar'],
        },
      ],
    ],
  },
  'basic-layer': {
    rows: [
      [
        {label: '7', insert: '7'},
        {label: '8', insert: '8'},
        {label: '9', insert: '9'},
        {label: '+', insert: '+'},
        {type: 'separator w5'},
        {type: 'small', latex: '\\frac{#0}{#0}'},
        {latex: '\\varnothing'},
        {latex: '\\infty'},
        {latex: '\\in'},
        {latex: '\\notin'},
      ],
      [
        {label: '4', latex: '4'},
        {label: '5', insert: '5'},
        {label: '6', insert: '6'},
        {label: '-', insert: '-'},
        {type: 'separator w5'},
        {label: '(', insert: '('},
        {label: ')', insert: ')'},
        {latex: '\\lt'},
        {latex: '\\le'},
        {latex: '\\hat{=}'},
      ],
      [
        {label: '1', insert: '1'},
        {label: '2', insert: '2'},
        {label: '3', insert: '3'},
        {latex: '\\cdot'},
        {type: 'separator w5'},
        {label: '[', insert: '['},
        {label: ']', insert: ']'},
        {latex: '\\gt'},
        {latex: '\\ge'},
        {
          type: 'action',
          label: '&#x232b;',
          command: ['performWithFeedback', 'deleteBackward'],
        },
      ],
      [
        {type: 'separator w10'},
        {label: '0', insert: '0'},
        {latex: ','},
        {latex: '\\colon'},
        {type: 'separator w5'},
        {latex: '\\lbrace'},
        {latex: '\\rbrace'},
        {latex: '\\ne'},
        {
          type: 'action',
          label: 'ᐸ',
          command: ['performWithFeedback', 'moveToPreviousChar'],
        },
        {
          type: 'action',
          label: 'ᐳ',
          command: ['performWithFeedback', 'moveToNextChar'],
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
  geometry: {
    label: 'Geometry',
    layer: 'geometry-layer',
  },
};
