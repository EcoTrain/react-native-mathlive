import {Atom, AtomJson} from '../core/atom-class';
import type {Context, GlobalContext} from '../core/context';

export class PhantomAtom extends Atom {
  private readonly isInvisible: boolean;
  private readonly smashHeight: boolean;
  private readonly smashDepth: boolean;
  private readonly smashWidth: boolean;
  constructor(
    command: string,
    body: Atom[],
    context: GlobalContext,
    options: {
      smashHeight?: boolean;
      smashDepth?: boolean;
      smashWidth?: boolean;
      isInvisible?: boolean;
      style: any;
    }
  ) {
    super('phantom', context, {command, style: options.style});
    this.captureSelection = true;
    this.body = body;
    this.isInvisible = options.isInvisible ?? false;
    this.smashDepth = options.smashDepth ?? false;
    this.smashHeight = options.smashHeight ?? false;
    this.smashWidth = options.smashWidth ?? false;
  }

  static fromJson(json: AtomJson, context: GlobalContext): PhantomAtom {
    return new PhantomAtom(json.command, json.body, context, json as any);
  }

  toJson(): AtomJson {
    const options: {[key: string]: any} = {};
    if (this.isInvisible) options.isInvisible = true;
    if (this.smashDepth) options.smashDepth = true;
    if (this.smashHeight) options.smashHeight = true;
    if (this.smashWidth) options.smashWidth = true;
    return {...super.toJson(), ...options};
  }

  render(context: Context): any {
    return null;
  }
}
