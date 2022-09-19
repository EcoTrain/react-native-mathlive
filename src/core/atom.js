import React from 'react';
import {View} from 'react-native';
import {Text} from '../components/styled/Text';

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

    // console.log(' == ATOM ', {...this});
  }

  // get treeDepth() {
  //   let result = 1;
  //   let atom = this.parent;
  //   while (atom) {
  //     atom = atom.parent;
  //     result += 1;
  //   }

  //   return result;
  // }

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

  getInitialBaseElement() {
    let result;
    if (!this.hasEmptyBranch('body')) {
      result = this.body[0].getInitialBaseElement();
    }

    return result ?? this;
  }

  getFinalBaseElement() {
    if (!this.hasEmptyBranch('body')) {
      return this.body[this.body.length - 1].getFinalBaseElement();
    }
    return this;
  }

  isCharacterBox() {
    const base = this.getInitialBaseElement();
    return /mord/.test(base.type);
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
    console.assert(children.length === 0);
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
    if (this.type === 'root') {
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
