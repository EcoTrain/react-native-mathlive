import {Atom, AtomJson} from '../core/atom-class';
import type {BoxType} from '../core/box';
import type {Context, GlobalContext} from '../core/context';

export class OverlapAtom extends Atom {
  private readonly align?: 'left' | 'right';
  private readonly boxType: BoxType;
  constructor(
    command: string,
    body: string | Atom[],
    context: GlobalContext,
    options?: {align?: 'left' | 'right'; boxType?: BoxType; style: any}
  ) {
    super('overlap', context, {command, style: options?.style});
    this.skipBoundary = true;
    if (typeof body === 'string') this.body = [new Atom('mord', context, {value: body})];
    else this.body = body;

    this.align = options?.align ?? 'left';
    this.boxType = options?.boxType ?? 'mord';
  }

  static fromJson(json: AtomJson, context: GlobalContext): OverlapAtom {
    return new OverlapAtom(json.command, json.body, context, json as any);
  }

  toJson(): AtomJson {
    const options: {[key: string]: any} = {};
    if (this.align) options.align = this.align;
    if (this.boxType) options.boxType = this.boxType;
    return {...super.toJson(), ...options};
  }

  render(context: Context): any {
    return null;
  }
}
