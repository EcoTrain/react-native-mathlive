export class Mode {
  static _registry = {};
  constructor(name) {
    Mode._registry[name] = this;
  }

  static createAtom(mode, command, context) {
    return Mode._registry[mode].createAtom(command, context);
  }

  static serialize(run, options) {
    console.assert(run.length > 0);
    const mode = Mode._registry[run[0].mode];
    return mode.serialize(run, options);
  }
}

/*
 * Return an array of runs with the same mode
 */
export function getModeRuns(atoms) {
  const result = [];
  let run = [];
  let currentMode = 'NONE';
  for (const atom of atoms) {
    if (atom.type !== 'first') {
      if (atom.mode !== currentMode) {
        if (run.length > 0) result.push(run);
        run = [atom];
        currentMode = atom.mode;
      } else run.push(atom);
    }
  }
  // Push whatever is left
  if (run.length > 0) result.push(run);
  return result;
}
