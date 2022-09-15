import {Atom} from '../core/atom';

export class GroupAtom extends Atom {
  constructor(arg, context, options) {
    super('group', context, {
      command: options?.command,
      mode: options?.mode ?? 'math',
      displayContainsHighlight: true,
    });
    this.body = arg;
    this.mathstyleName = options?.mathstyleName;

    this.latexOpen = options?.latexOpen;
    this.latexClose = options?.latexClose;
    this.cssId = options?.cssId;
    this.htmlData = options?.htmlData;
    this.htmlStyle = options?.htmlStyle;
    this.customClass = options?.customClass;

    this.boxType = options?.boxType;
    this.skipBoundary = true;
    this.captureSelection = options?.captureSelection ?? false;
    this.changeMode = options?.changeMode ?? false;
    this.displayContainsHighlight = false;

    if (arg && arg.length === 1 && arg[0].command === ',') {
      // French decimal point
      this.captureSelection = true;
    }
  }

  render(context) {
    return null;
  }

  serialize(options) {
    let result = this.bodyToLatex(options);

    if (typeof this.latexOpen === 'string') result = this.latexOpen + result + this.latexClose;

    if (this.htmlData) result = `\\htmlData{${this.htmlData}}{${result}}`;

    if (this.htmlStyle) result = `\\htmlStyle{${this.htmlStyle}}{${result}}`;

    if (this.customClass) result = `\\class{${this.customClass}}{${result}}`;

    if (this.cssId) result = `\\cssId{${this.cssId}}{${result}}`;

    return result;
  }
}
