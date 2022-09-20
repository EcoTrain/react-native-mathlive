import React from 'react';
import {View} from 'react-native';
import {Text} from '../components/styled/Text';
import {joinLatex} from './tokenizer';

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
    if (typeof options?.value === 'string') {
      this.value = options.value;
    }
    this.command = options?.command ?? this.value ?? '';
    this.isFunction = options?.isFunction ?? false;
    if (options?.serialize) {
      console.assert(typeof options.command === 'string');
      Atom.customSerializer[options.command] = options.serialize;
    }
  }

  /**
   * Given an atom or an array of atoms, return a LaTeX string representation
   */
  static serialize(value) {
    if (Array.isArray(value)) {
      return serializeAtoms(value);
    }

    if (typeof value === 'number' || typeof value === 'boolean') {
      return value.toString();
    }

    if (typeof value === 'string') {
      return value.replace(/\s/g, '~');
    }

    if (value === undefined) {
      return '';
    }

    // If we have some verbatim latex for this atom, use it.
    // This allow non-significant punctuation to be preserved when possible.
    if (typeof value.verbatimLatex === 'string') {
      return value.verbatimLatex;
    }

    if (value.command && Atom.customSerializer[value.command]) {
      return Atom.customSerializer[value.command](value);
    }

    return value.serialize();
  }

  static fromJson(json, context) {
    const result = new Atom(json.type, context, json);
    // Restore the branches
    for (const branch of NAMED_BRANCHES) {
      if (json[branch]) {
        result.setChildren(json[branch], branch);
      }
    }

    return result;
  }

  toJson() {
    const result = {type: this.type};

    if (this.mode !== 'math') {
      result.mode = this.mode;
    }
    if (this.command && this.command !== this.value) {
      result.command = this.command;
    }
    if (this.value !== undefined) {
      result.value = this.value;
    }
    if (this.style && Object.keys(this.style).length > 0) {
      result.style = {...this.style};
    }

    if (this.verbatimLatex !== undefined) {
      result.verbatimLatex = this.verbatimLatex;
    }

    if (this.subsupPlacement) {
      result.subsupPlacement = this.subsupPlacement;
    }
    if (this.explicitSubsupPlacement) {
      result.explicitSubsupPlacement = true;
    }

    if (this.isFunction) {
      result.isFunction = true;
    }
    if (this.displayContainsHighlight) {
      result.displayContainsHighlight = true;
    }
    if (this.isExtensibleSymbol) {
      result.isExtensibleSymbol = true;
    }
    if (this.skipBoundary) {
      result.skipBoundary = true;
    }
    if (this.captureSelection) {
      result.captureSelection = true;
    }

    if (this._branches) {
      for (const branch of Object.keys(this._branches)) {
        if (this._branches[branch]) {
          result[branch] = this._branches[branch].filter(x => x.type !== 'first').map(x => x.toJson());
        }
      }
    }

    return result;
  }

  /**
   * Serialize the atom  to LaTeX
   */
  serialize() {
    if (this.body && this.command) {
      // There's a command and body
      return joinLatex([this.command, '{', this.bodyToLatex(), '}']);
    }

    if (this.body) {
      // There's a body with no command
      return joinLatex([this.bodyToLatex()]);
    }

    if (this.value) {
      return this.value;
    }

    return '';
  }

  bodyToLatex() {
    return serializeAtoms(this.body);
  }

  aboveToLatex() {
    return serializeAtoms(this.above);
  }

  belowToLatex() {
    return serializeAtoms(this.below);
  }

  // Current depth level
  get treeDepth() {
    let result = 1;
    let atom = this.parent;
    while (atom) {
      atom = atom.parent;
      result += 1;
    }

    return result;
  }

  /**
   * Return the atoms in the branch, if it exists, otherwise null
   */
  branch(name) {
    if (!isNamedBranch(name)) {
      return undefined;
    }
    if (!this._branches) {
      return undefined;
    }
    return this._branches[name];
  }

  /**
   * Return all the branches that exist.
   * Some of them may be empty.
   */
  get branches() {
    if (!this._branches) {
      return [];
    }
    const result = [];
    for (const branch of NAMED_BRANCHES) {
      if (this._branches[branch]) {
        result.push(branch);
      }
    }
    return result;
  }

  /**
   * Return the atoms in the branch, if it exists, otherwise create it
   */
  createBranch(name) {
    console.assert(isNamedBranch(name));
    if (!isNamedBranch(name)) {
      return [];
    }
    if (!this._branches) {
      this._branches = {
        [name]: [],
      };
    } else if (!this._branches[name]) {
      this._branches[name] = [];
    }

    return this._branches[name];
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

  hasEmptyBranch(branch) {
    const atoms = this.branch(branch);
    if (!atoms) {
      return true;
    }
    console.assert(atoms.length > 0);
    return atoms.length === 0;
  }

  /*
   * Setting `null` does nothing
   * Setting `[]` adds an empty list (the branch is created)
   */
  setChildren(children, branch) {
    if (!children) {
      return;
    }
    if (!isNamedBranch(branch)) {
      return;
    }

    // Update the parent
    const newBranch = [...children];
    if (this._branches) {
      this._branches[branch] = newBranch;
    } else {
      this._branches = {[branch]: newBranch};
    }

    // Update the children
    for (const child of children) {
      child.parent = this;
      child.treeBranch = branch;
    }
  }

  addChild(child, branch) {
    this.createBranch(branch).push(child);

    // Update the child
    child.parent = this;
    child.treeBranch = branch;
  }

  addChildBefore(child, before) {
    console.assert(before.treeBranch !== undefined);
    const branch = this.createBranch(before.treeBranch);
    branch.splice(branch.indexOf(before), 0, child);

    // Update the child
    child.parent = this;
    child.treeBranch = before.treeBranch;
  }

  addChildAfter(child, after) {
    const branch = this.createBranch(after.treeBranch);
    branch.splice(branch.indexOf(after) + 1, 0, child);

    // Update the child
    child.parent = this;
    child.treeBranch = after.treeBranch;
  }

  addChildren({children, branch = 'body'}) {
    for (const child of children) {
      this.addChild(child, branch);
    }
  }

  /**
   * Return the last atom that was added
   */
  addChildrenAfter(children, after) {
    console.assert(after.treeBranch !== undefined);
    const branch = this.createBranch(after.treeBranch);
    branch.splice(branch.indexOf(after) + 1, 0, ...children);

    // Update the children
    for (const child of children) {
      child.parent = this;
      child.treeBranch = after.treeBranch;
    }
    return children[children.length - 1];
  }

  removeBranch(name) {
    const children = this.branch(name);
    if (isNamedBranch(name)) {
      this._branches[name] = undefined;
    }
    if (!children) {
      return [];
    }
    for (const child of children) {
      child.parent = undefined;
      child.treeBranch = undefined;
    }
    return children;
  }

  removeChild(child) {
    console.assert(child.parent === this);

    // Update the parent
    const branch = this.branch(child.treeBranch);
    const index = branch.indexOf(child);
    console.assert(index >= 0);
    branch.splice(index, 1);

    // Update the child
    child.parent = undefined;
    child.treeBranch = undefined;
  }

  get siblings() {
    if (!this.parent) {
      return [];
    }
    return this.parent.branch(this.treeBranch);
  }

  get firstSibling() {
    return this.siblings[0];
  }

  get lastSibling() {
    const {siblings} = this;
    return siblings[siblings.length - 1];
  }

  get isFirstSibling() {
    return this === this.firstSibling;
  }

  get isLastSibling() {
    return this === this.lastSibling;
  }

  get hasNoSiblings() {
    return this.siblings.length === 0;
  }

  get leftSibling() {
    console.assert(this.parent !== undefined);
    const siblings = this.parent.branch(this.treeBranch);
    return siblings[siblings.indexOf(this) - 1];
  }

  get rightSibling() {
    console.assert(this.parent !== undefined);
    const siblings = this.parent.branch(this.treeBranch);
    return siblings[siblings.indexOf(this) + 1];
  }

  get hasChildren() {
    return this._branches && this.children.length > 0;
  }

  get firstChild() {
    console.assert(this.hasChildren);
    return this.children[0];
  }

  get lastChild() {
    console.assert(this.hasChildren);
    const {children} = this;
    return children[children.length - 1];
  }

  /**
   * All the children of this atom.
   *
   * The order of the atoms is the order in which they
   * are navigated using the keyboard.
   */
  get children() {
    if (this._children) {
      return this._children;
    }
    if (!this._branches) {
      return [];
    }
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

  render() {
    console.log('=== BASE Atom render', {...this});
    return (
      <View>
        <Text>atomBase</Text>
      </View>
    );
  }
}

/**
 *
 * @param atoms the list of atoms to emit as LaTeX
 * @param options.expandMacro true if macros should be expanded
 * @result a LaTeX string
 */
function serializeAtoms(atoms) {
  if (!atoms || atoms.length === 0) {
    return '';
  }
  return joinLatex(atoms.map(x => x.serialize()));
}
