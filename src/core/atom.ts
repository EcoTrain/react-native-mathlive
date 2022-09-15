// import {BoxAtom} from '../core-atoms/box';
// import {CompositionAtom} from '../core-atoms/composition';
// import {ErrorAtom} from '../core-atoms/error';
// import {GenfracAtom} from '../core-atoms/genfrac';
// import {GroupAtom} from '../core-atoms/group';
// import {LatexAtom, LatexGroupAtom} from '../core-atoms/latex';
// import {LeftRightAtom} from '../core-atoms/leftright';
// import {LineAtom} from '../core-atoms/line';
// import {OverlapAtom} from '../core-atoms/overlap';
// import {OverunderAtom} from '../core-atoms/overunder';
// import {PlaceholderAtom} from '../core-atoms/placeholder';
// import {PhantomAtom} from '../core-atoms/phantom';
// import {RuleAtom} from '../core-atoms/rule';
// import {SizedDelimAtom} from '../core-atoms/delim';
// import {SubsupAtom} from '../core-atoms/subsup';
// import {SurdAtom} from '../core-atoms/surd';
// import {TextAtom} from '../core-atoms/text';

// import { Atom, AtomJson, AtomType, NAMED_BRANCHES } from './atom-class';
// import { GlobalContext } from './context';

export * from './atom-class';

// export function fromJson(json: AtomJson, context: GlobalContext): Atom;
// export function fromJson(json: AtomJson[], context: GlobalContext): Atom[];
// export function fromJson(
//   json: AtomJson | AtomJson[],
//   context: GlobalContext
// ): Atom | Atom[] {

//   json = { ...json };

//   // Restore the branches
//   for (const branch of NAMED_BRANCHES) {
//     if (json[branch])
//       json[branch] = fromJson(json[branch] as AtomJson[], context);
//   }

//   const type: AtomType = json.type;
//   let result: Atom | undefined = undefined;
//   if (type === 'box') result = BoxAtom.fromJson(json, context);
//   if (type === 'composition') result = CompositionAtom.fromJson(json, context);
//   if (type === 'error') result = ErrorAtom.fromJson(json, context);
//   if (type === 'genfrac') result = GenfracAtom.fromJson(json, context);
//   if (type === 'group') result = GroupAtom.fromJson(json, context);
//   if (type === 'latex') result = LatexAtom.fromJson(json, context);
//   if (type === 'latexgroup') result = LatexGroupAtom.fromJson(json, context);
//   if (type === 'leftright') result = LeftRightAtom.fromJson(json, context);
//   if (type === 'line') result = LineAtom.fromJson(json, context);
//   if (type === 'msubsup') result = SubsupAtom.fromJson(json, context);
//   if (type === 'overlap') result = OverlapAtom.fromJson(json, context);
//   if (type === 'overunder') result = OverunderAtom.fromJson(json, context);
//   if (type === 'placeholder') {
//     if (json.defaultValue)
//       json.defaultValue = fromJson(json.defaultValue, context);
//     result = PlaceholderAtom.fromJson(json, context);
//   }
//   if (type === 'phantom') result = PhantomAtom.fromJson(json, context);
//   if (type === 'rule') result = RuleAtom.fromJson(json, context);
//   if (type === 'sizeddelim') result = SizedDelimAtom.fromJson(json, context);
//   if (type === 'surd') result = SurdAtom.fromJson(json, context);
//   if (type === 'text') result = TextAtom.fromJson(json, context);

//   if (!result) result = Atom.fromJson(json, context);

//   for (const branch of NAMED_BRANCHES)
//     if (json[branch]) result.setChildren(json[branch], branch);

//   // Restore properties

//   if (json.verbatimLatex !== undefined)
//     result.verbatimLatex = json.verbatimLatex;

//   if (json.subsupPlacement) result.subsupPlacement = json.subsupPlacement;
//   if (json.explicitSubsupPlacement) result.explicitSubsupPlacement = true;

//   if (json.isFunction) result.isFunction = true;
//   if (json.isExtensibleSymbol) result.isExtensibleSymbol = true;
//   if (json.skipBoundary) result.skipBoundary = true;
//   if (json.captureSelection) result.captureSelection = true;

//   return result;
// }
