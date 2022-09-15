import {Atom} from '../core/atom-class';
import type {Context, GlobalContext} from '../core/context';

export class LineAtom extends Atom {
  private readonly position: 'overline' | 'underline';
  constructor(
    command: string,
    body: Atom[],
    context: GlobalContext,
    options: {position: 'overline' | 'underline'; style: any}
  ) {
    super('line', context, {command, style: options.style});
    this.skipBoundary = true;
    this.body = body;
    this.position = options.position;
  }

  render(parentContext): any {
    return null;
  }
}
