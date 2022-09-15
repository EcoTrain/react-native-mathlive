import {View, Text} from 'react-native';
import {Context} from './context';

/**
 * The order of these branches specify the default keyboard navigation order.
 * It can be overriden in `get children()`
 */
export const NAMED_BRANCHES = ['above', 'body', 'below', 'superscript', 'subscript'];

/**
 * A _branch_ is a set of children of an atom.
 *
 * There are two kind of branches:
 * - **named branches** used with other kind of atoms. There is a fixed set of
 * possible named branches.
 */
export function isNamedBranch(branch) {
  return typeof branch === 'string' && NAMED_BRANCHES.includes(branch);
}

/**
 * An atom is an object encapsulating an elementary mathematical unit,
 * independent of its graphical representation.
 *
 * It keeps track of the content, while the dimensions, position
 * are tracked by Box objects which are created by the `createBox()` function.
 */
export class Atom {
  constructor(type, context, options) {
    this.type = type;
    this.context = context;
    if (typeof options?.value === 'string') this.value = options.value;
    this.command = options?.command ?? this.value ?? '';
    this.mode = options?.mode ?? 'math';
    this.isFunction = options?.isFunction ?? false;
    this.displayContainsHighlight = options?.displayContainsHighlight ?? false;
    if (options?.serialize) {
      console.assert(typeof options.command === 'string');
      Atom.customSerializer[options.command] = options.serialize;
    }
  }

  /**
   * Given an atom or an array of atoms, return a LaTeX string representation
   */
  static serialize(value, options) {
    if (Array.isArray(value)) return serializeAtoms(value, options);

    if (typeof value === 'number' || typeof value === 'boolean') return value.toString();

    if (typeof value === 'string') return value.replace(/\s/g, '~');

    if (value === undefined) return '';

    // If we have some verbatim latex for this atom, use it.
    // This allow non-significant punctuation to be preserved when possible.
    // if (!options.expandMacro && typeof value.verbatimLatex === 'string') return value.verbatimLatex;

    // if (value.command && Atom.customSerializer[value.command])
    //   return Atom.customSerializer[value.command](value, options);

    return value.serialize(options);
  }

  /**
   * The common ancestor between two atoms
   */
  static commonAncestor(a, b) {
    if (a === b) return a.parent;

    // Short-circuit a common case
    if (a.parent === b.parent) return a.parent;

    // Accumulate all the parents of `a`
    const parents = new WeakSet();
    let {parent} = a;
    while (parent) {
      parents.add(parent);
      parent = parent.parent;
    }

    // Walk up the parents of `b`. If a parent of `b` is also a parent of
    // `a`, it's the common ancestor
    parent = b.parent;
    while (parent) {
      if (parents.has(parent)) return parent;
      parent = parent.parent;
    }

    console.assert(Boolean(parent)); // Never reached
    return undefined;
  }

  get changeCounter() {
    return this._changeCounter;
  }

  get isDirty() {
    return this._isDirty;
  }

  set isDirty(dirty) {
    this._isDirty = dirty;
    if (dirty) {
      this._changeCounter++;
      this.verbatimLatex = undefined;
      this._children = undefined;

      let {parent} = this;
      while (parent) {
        parent._isDirty = true;
        parent._changeCounter++;
        parent.verbatimLatex = undefined;
        parent._children = undefined;

        parent = parent.parent;
      }
    }
  }

  get treeDepth() {
    let result = 1;
    let atom = this.parent;
    while (atom) {
      atom = atom.parent;
      result += 1;
    }

    return result;
  }

  get inCaptureSelection() {
    let result = false;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let atom = this;
    while (atom) {
      if (atom.captureSelection) {
        result = true;
        break;
      }
      atom = atom.parent;
    }
    return result;
  }

  /**
   * Return the atoms in the branch, if it exists, otherwise null
   */
  branch(name) {
    if (!isNamedBranch(name)) return undefined;
    if (!this._branches) return undefined;
    return this._branches[name];
  }

  /**
   * Return all the branches that exist.
   * Some of them may be empty.
   */
  get branches() {
    if (!this._branches) return [];
    const result = [];
    for (const branch of NAMED_BRANCHES) if (this._branches[branch]) result.push(branch);

    return result;
  }

  /**
   * Return the atoms in the branch, if it exists, otherwise create it
   */
  createBranch(name) {
    console.assert(isNamedBranch(name));
    if (!isNamedBranch(name)) return [];
    if (!this._branches) {
      this._branches = {
        [name]: [this.makeFirstAtom(name)],
      };
    } else if (!this._branches[name]) this._branches[name] = [this.makeFirstAtom(name)];

    this.isDirty = true;
    return this._branches[name];
  }

  get row() {
    if (!isCellBranch(this.treeBranch)) return -1;
    return this.treeBranch[0];
  }

  get col() {
    if (!isCellBranch(this.treeBranch)) return -1;
    return this.treeBranch[1];
  }

  get body() {
    return this._branches?.body;
  }

  set body(atoms) {
    this.setChildren(atoms, 'body');
  }

  get above() {
    return this._branches?.above;
  }

  set above(atoms) {
    this.setChildren(atoms, 'above');
  }

  get below() {
    return this._branches?.below;
  }

  set below(atoms) {
    this.setChildren(atoms, 'below');
  }

  getInitialBaseElement() {
    let result = undefined;
    if (!this.hasEmptyBranch('body')) {
      result = this.body[1].getInitialBaseElement();
    }

    return result ?? this;
  }

  isCharacterBox() {
    const base = this.getInitialBaseElement();
    return /mord/.test(base.type);
  }

  hasEmptyBranch(branch) {
    const atoms = this.branch(branch);
    if (!atoms) return true;
    return atoms.length === 1;
  }

  /*
   * Setting `null` does nothing
   * Setting `[]` adds an empty list (the branch is created)
   * The children should *not* start with a `"first"` atom:
   * the `first` atom will be added if necessary
   */
  setChildren(children, branch) {
    if (!children) return;
    console.assert(isNamedBranch(branch));
    if (!isNamedBranch(branch)) return;
    console.assert(children[0]?.type !== 'first');

    // Update the parent
    const newBranch = [this.makeFirstAtom(branch), ...children];
    if (this._branches) this._branches[branch] = newBranch;
    else this._branches = {[branch]: newBranch};

    // Update the children
    for (const child of children) {
      child.parent = this;
      child.treeBranch = branch;
    }

    this.isDirty = true;
  }

  makeFirstAtom(branch) {
    const result = new Atom('first', this.context, {mode: this.mode});
    result.parent = this;
    result.treeBranch = branch;
    return result;
  }

  addChild(child, branch) {
    console.assert(child.type !== 'first');

    this.createBranch(branch).push(child);
    this.isDirty = true;

    // Update the child
    child.parent = this;
    child.treeBranch = branch;
  }

  addChildBefore(child, before) {
    console.assert(before.treeBranch !== undefined);
    const branch = this.createBranch(before.treeBranch);
    branch.splice(branch.indexOf(before), 0, child);
    this.isDirty = true;

    // Update the child
    child.parent = this;
    child.treeBranch = before.treeBranch;
  }

  addChildAfter(child, after) {
    console.assert(after.treeBranch !== undefined);
    const branch = this.createBranch(after.treeBranch);
    branch.splice(branch.indexOf(after) + 1, 0, child);
    this.isDirty = true;

    // Update the child
    child.parent = this;
    child.treeBranch = after.treeBranch;
  }

  addChildren(children, branch) {
    for (const child of children) this.addChild(child, branch);
  }

  /**
   * Return the last atom that was added
   */
  addChildrenAfter(children, after) {
    console.assert(children.length === 0 || children[0].type !== 'first');
    console.assert(after.treeBranch !== undefined);
    const branch = this.createBranch(after.treeBranch);
    branch.splice(branch.indexOf(after) + 1, 0, ...children);
    this.isDirty = true;

    // Update the children
    for (const child of children) {
      child.parent = this;
      child.treeBranch = after.treeBranch;
    }
    return children[children.length - 1];
  }

  removeBranch(name) {
    const children = this.branch(name);
    if (isNamedBranch(name)) this._branches[name] = undefined;

    if (!children) return [];

    for (const child of children) {
      child.parent = undefined;
      child.treeBranch = undefined;
    }
    // Drop the 'first' element
    console.assert(children[0].type === 'first');
    children.shift();
    this.isDirty = true;
    return children;
  }

  removeChild(child) {
    console.assert(child.parent === this);

    // `first` atom cannot be deleted
    if (child.type === 'first') return;

    // Update the parent
    const branch = this.branch(child.treeBranch);
    const index = branch.indexOf(child);
    console.assert(index >= 0);
    branch.splice(index, 1);
    this.isDirty = true;

    // Update the child
    child.parent = undefined;
    child.treeBranch = undefined;
  }

  get siblings() {
    if (this.type === 'root') return [];
    return this.parent.branch(this.treeBranch);
  }

  get hasChildren() {
    return this._branches && this.children.length > 0;
  }

  get firstChild() {
    console.assert(this.hasChildren);
    return this.children[0];
  }

  /**
   * All the children of this atom.
   *
   * The order of the atoms is the order in which they
   * are navigated using the keyboard.
   */
  get children() {
    if (this._children) return this._children;
    if (!this._branches) return [];
    const result = [];
    for (const branchName of NAMED_BRANCHES) {
      if (this._branches[branchName]) {
        for (const x of this._branches[branchName]) {
          result.push(...x.children);
          result.push(x);
        }
      }
    }

    this._children = result;
    return result;
  }

  /**
   * Render this atom as an array of boxes.
   *
   * The parent context (color, size...) will be applied
   * to the result.
   *
   */
  render(parentContext, options) {
    // if (this.type === 'first' && !parentContext.atomIdsSettings) return null;

    //
    // 1. Render the body or value
    //
    console.log({parentContext, options});
    const context = new Context(parentContext);
    console.log({context});
    return (
      <View>
        <Text>atom</Text>
      </View>
    );
  }

  /**
   * Add an ID attribute to both the box and this atom so that the atom
   * can be retrieved from the box later on, e.g. when the box is clicked on.
   */
  bind(context, box) {
    // Don't bind to phantom boxes or "empty" atoms (\u200b)
    // (they won't be interactive, so no need for the id)
    if (!box || context.isPhantom || this.value === '\u200B') return box;

    let parent = this.parent;
    while (parent && !parent.captureSelection) parent = parent.parent;
    if (parent?.captureSelection) return box;

    if (!this.id) this.id = context.makeID();
    box.atomID = this.id;

    return box;
  }

  /** Return true if a digit, or a decimal point, or a french decimal `{,}` */
  isDigit() {
    if (this.type === 'mord' && this.value) return /^[\d,.]$/.test(this.value);
    if (this.type === 'group' && this.body?.length === 2)
      return this.body[0].type === 'first' && this.body[1].value === ',';

    return false;
  }
}
