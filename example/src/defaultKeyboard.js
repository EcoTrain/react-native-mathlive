export const CUSTOM_KEYBOARD_LAYERS = {
  'variables-layer': {
    rows: [
      [
        {label: 'var1', insert: '\\smash[metaVar1]{textVar1}'},
        {label: 'var2', insert: '\\smash[metaVar2]{textVar2}'},
        {label: 'var3', insert: '\\smash[metaVar3]{textVar3}'},
        {label: 'var4', insert: '\\smash[metaVar4]{textVar4}'},
        {label: 'var5', insert: '\\smash[metaVar5]{textVar5}'},
        {label: 'var6', insert: '\\smash[metaVar6]{textVar6}'},
        {label: 'var7', insert: '\\smash[metaVar7]{textVar7}'},
        {label: 'var8', insert: '\\smash[metaVar8]{textVar8}'},
      ],
      [
        {type: 'separator w10'},
        {type: 'separator w10'},
        {type: 'separator w10'},
        {type: 'separator w10'},
        {type: 'separator w10'},
        {type: 'separator w10'},
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

export const CUSTOM_KEYBOARDS = {
  variables: {
    label: 'Variables',
    layer: 'variables-layer',
  },
};
