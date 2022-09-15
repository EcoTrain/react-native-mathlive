import type {ParseMode, Style} from '../public/core';

import {Atom, AtomJson, ToLatexOptions} from '../core/atom-class';
import type {Context, GlobalContext} from '../core/context';
import type {MathstyleName} from '../core/mathstyle';
import type {BoxType} from '../core/box';

export class GroupAtom extends Atom {
  latexOpen?: string;
  latexClose?: string;
  cssId?: string;
  htmlData?: string;
  htmlStyle?: string;
  customClass?: string;
  mathstyleName?: MathstyleName;
  boxType?: BoxType;
  // This atom causes the parsemode to change. Use by commands such as
  // `\mbox` to indicate that it is not necessary to wrap them in a mode
  // changing command (`\text`).
  changeMode: boolean;

  constructor(
    arg: Atom[] | undefined,
    context: GlobalContext,
    options?: {
      boxType?: BoxType;
      changeMode?: boolean;
      mathstyleName?: MathstyleName;
      latexOpen?: string;
      latexClose?: string;
      cssId?: string;
      htmlData?: string;
      htmlStyle?: string;
      customClass?: string;
      mode?: ParseMode;
      style?: any;
      captureSelection?: boolean;
      serialize?: (atom: GroupAtom, options: ToLatexOptions) => string;
      command?: string;
    }
  ) {
    super('group', context, {
      command: options?.command,
      mode: options?.mode ?? 'math',
      style: options?.style,
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

    if (arg && arg.length === 1 && arg[0]!.command === ',') {
      // French decimal point
      this.captureSelection = true;
    }
  }

  static fromJson(json: AtomJson, context: GlobalContext): GroupAtom {
    return new GroupAtom(json.body, context, json as any);
  }

  toJson(): AtomJson {
    const options: {[key: string]: any} = {};
    if (this.mathstyleName) options.mathstyleName = this.mathstyleName;
    if (this.latexOpen) options.latexOpen = this.latexOpen;
    if (this.latexClose) options.latexClose = this.latexClose;
    if (this.cssId) options.cssId = this.cssId;
    if (this.htmlData) options.htmlData = this.htmlData;
    if (this.htmlStyle) options.htmlStyle = this.htmlStyle;
    if (this.customClass) options.customClass = this.customClass;
    if (this.boxType) options.boxType = this.boxType;
    if (this.captureSelection) options.captureSelection = true;
    if (this.changeMode) options.changeMode = true;

    return {...super.toJson(), ...options};
  }

  render(context: Context): any {
    return null;
  }

  serialize(options: ToLatexOptions): string {
    let result = this.bodyToLatex(options);

    if (typeof this.latexOpen === 'string') result = this.latexOpen + result + this.latexClose;

    if (this.htmlData) result = `\\htmlData{${this.htmlData}}{${result}}`;

    if (this.htmlStyle) result = `\\htmlStyle{${this.htmlStyle}}{${result}}`;

    if (this.customClass) result = `\\class{${this.customClass}}{${result}}`;

    if (this.cssId) result = `\\cssId{${this.cssId}}{${result}}`;

    return result;
  }
}
