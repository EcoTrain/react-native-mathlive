import {newSymbols, newSymbolRange} from './definitions-utils';

// Simple characters allowed in math mode
newSymbols('0123456789/@.?!');
newSymbolRange(0x0041, 0x005a); // a-z
newSymbolRange(0x0061, 0x007a); // A-Z

// Quantifiers

newSymbols([
  ['\\forall', 0x2200],
  ['\\exists', 0x2203],
  ['\\nexists', 0x2204, 'mord'],
  ['\\mid', 0x2223, 'mrel'],
  ['\\top', 0x22a4],
  ['\\bot', 0x22a5],
]);

// Misc Symbols

newSymbols([
  ['\\sharp', 0x266f],
  ['\\flat', 0x266d],
  ['\\natural', 0x266e],
  ['\\#', 0x0023],
  ['\\&', 0x0026],
  ['\\clubsuit', 0x2663],
  ['\\heartsuit', 0x2661],
  ['\\spadesuit', 0x2660],
  ['\\diamondsuit', 0x2662],
  ['\\parallelogram', 0x25b1],
]);

newSymbols([
  ['\\backslash', 0x005c],
  ['\\nabla', 0x2207],
  ['\\partial', 0x2202],
  ['\\ell', 0x2113],
  ['\\hbar', 0x210f],
  ['\\pounds', 0x00a3],
  ['\\euro', 0x20ac], // NOTE: not TeX built-in, but textcomp package
]);

// Arrow Symbols
newSymbols(
  [
    ['\\rightarrow', 0x2192],
    ['\\to', 0x2192],
    ['\\leftarrow', 0x2190],
    ['\\gets', 0x2190],
    ['\\Rightarrow', 0x21d2],
    ['\\Leftarrow', 0x21d0],
    ['\\longrightarrow', 0x27f6],
    ['\\longleftarrow', 0x27f5],
    ['\\Longrightarrow', 0x27f9],
    ['\\implies', 0x27f9],
    ['\\Longleftarrow', 0x27f8],
    ['\\impliedby', 0x27f8],

    ['\\longleftrightarrow', 0x27f7],
    ['\\biconditional', 0x27f7],
    ['\\Longleftrightarrow', 0x27fa],

    ['\\mapsto', 0x21a6],
    ['\\longmapsto', 0x27fc],

    ['\\uparrow', 0x2191],
    ['\\downarrow', 0x2193],
    ['\\Uparrow', 0x21d1],
    ['\\Downarrow', 0x21d3],
    ['\\updownarrow', 0x2195],
    ['\\Updownarrow', 0x21d5],

    ['\\hookrightarrow', 0x21aa],
    ['\\hookleftarrow', 0x21a9],

    ['\\rightharpoonup', 0x21c0],
    ['\\leftharpoonup', 0x21bc],
    ['\\rightharpoondown', 0x21c1],
    ['\\leftharpoondown', 0x21bd],

    ['\\searrow', 0x2198],
    ['\\nearrow', 0x2197],
    ['\\swarrow', 0x2199],
    ['\\nwarrow', 0x2196],

    ['\\originalof', 0x22b6],
    ['\\laplace', 0x22b6],
    ['\\imageof', 0x22b7],
    ['\\Laplace', 0x22b7],
  ],
  'mrel'
);

// 'ams' Misc
newSymbols([
  // 'ams' Delimiters

  ['\\lbrace', 0x007b, 'mopen'],
  ['\\rbrace', 0x007d, 'mclose'],
  ['\\lparen', 0x0028, 'mopen'],
  ['\\rparen', 0x0029, 'mclose'],
  ['\\langle', 0x27e8, 'mopen'],
  ['\\rangle', 0x27e9, 'mclose'],
  ['\\lfloor', 0x230a, 'mopen'],
  ['\\rfloor', 0x230b, 'mclose'],
  ['\\lceil', 0x2308, 'mopen'],
  ['\\rceil', 0x2309, 'mclose'],

  ['\\vert', 0x2223],
  ['\\lvert', 0x2223, 'mopen'],
  ['\\rvert', 0x2223, 'mclose'],
  ['\\|', 0x2225],
  ['\\Vert', 0x2225],
  ['\\mVert', 0x2225],
  ['\\lVert', 0x2225, 'mopen'],
  ['\\rVert', 0x2225, 'mclose'],

  ['\\lbrack', 0x005b, 'mopen'],
  ['\\rbrack', 0x005d, 'mclose'],
  ['\\{', 0x007b, 'mopen'],
  ['\\}', 0x007d, 'mclose'],

  ['(', 0x0028, 'mopen'],
  [')', 0x029, 'mclose'],
  ['[', 0x005b, 'mopen'],
  [']', 0x005d, 'mclose'],

  // Large Delimiters

  ['\\lgroup', 0x27ee, 'mopen'],
  ['\\rgroup', 0x27ef, 'mclose'],
  ['\\lmoustache', 0x23b0, 'mopen'],
  ['\\rmoustache', 0x23b1, 'mclose'],
]);

// Binary Operators
newSymbols(
  [
    ['+', 0x002b],
    ['-', 0x2212],
    ['\u2212', 0x2212],
    ['\\pm', 0x00b1],
    ['\\mp', 0x2213],
    ['*', 0x2217],
    ['\\times', 0x00d7],
    ['\\div', 0x00f7],

    ['\\divides', 0x2223],
    ['\\cdot', 0x22c5],
    ['\\cap', 0x2229],
    ['\\cup', 0x222a],
    ['\\setminus', 0x2216],
    ['\\land', 0x2227],
    ['\\wedge', 0x2227],
    ['\\lor', 0x2228],
    ['\\vee', 0x2228],
    ['\\circ', 0x2218],
    ['\\bigcirc', 0x25ef],
    ['\\bullet', 0x2219],
    ['\\oplus', 0x2295],
    ['\\ominus', 0x2296],
    ['\\otimes', 0x2297],
    ['\\odot', 0x2299],
    ['\\oslash', 0x2298],
    ['\\bigtriangleup', 0x25b3],
    ['\\bigtriangledown', 0x25bd],

    ['\\triangleleft', 0x25c3],
    ['\\triangleright', 0x25b9],
    ['\\And', 0x0026],
    ['\\dagger', 0x2020],
    ['\\dag', 0x2020],
    ['\\ddag', 0x2021],
    ['\\ddagger', 0x2021],
    ['\\ast', 0x2217],
    ['\\star', 0x22c6],
    ['\\bigstar', 0x2605],
    ['\\diamond', 0x22c4],
  ],
  'mbin'
);

// Relational symbols
newSymbols(
  [
    ['=', 0x003d],
    ['<', 0x003c],
    ['\\lt', 0x003c],
    ['>', 0x003e],
    ['\\gt', 0x003e],

    ['\\le', 0x2264],
    ['\\leq', 0x2264],
    ['\\ge', 0x2265],
    ['\\geq', 0x2265],

    ['\\ll', 0x226a],
    ['\\gg', 0x226b],
    ['\\coloneq', 0x2254],
    ['\\measeq', 0x225d], // MEASSURED BY
    ['\\eqdef', 0x225e],
    ['\\questeq', 0x225f], // QUESTIONED EQUAL TO

    [':', 0x003a],
    ['\\cong', 0x2245],

    ['\\equiv', 0x2261],

    ['\\prec', 0x227a],
    ['\\preceq', 0x2aaf],
    ['\\succ', 0x227b],
    ['\\succeq', 0x2ab0],

    ['\\perp', 0x22a5],

    ['\\propto', 0x221d],
    ['\\Colon', 0x2237],

    ['\\smile', 0x2323],
    ['\\frown', 0x2322],

    ['\\sim', 0x223c],
    ['\\doteq', 0x2250],
    ['\\bowtie', 0x22c8],
    ['\\Join', 0x22c8],

    ['\\asymp', 0x224d],

    ['\\sqsubseteq', 0x2291],
    ['\\sqsupseteq', 0x2292],

    ['\\approx', 0x2248], // In TeX, '~' is a spacing command (non-breaking space).
    // However, '~' is used as an ASCII Math shortctut character, so define a \\~
    // command which maps to the '~' character
    ['\\~', 0x007e],

    ['\\leftrightarrow', 0x2194],
    ['\\Leftrightarrow', 0x21d4],
    ['\\models', 0x22a8],
    ['\\vdash', 0x22a2],

    ['\\dashv', 0x22a3],
    ['\\roundimplies', 0x2970],

    ['\\in', 0x2208],
    ['\\notin', 0x2209],
    // defineSymbol('\\not', 0x0338],
    // defineSymbol('\\not', 0xe020],
    ['\\ni', 0x220b],
    ['\\owns', 0x220b],
    ['\\subset', 0x2282],
    ['\\supset', 0x2283],
    ['\\subseteq', 0x2286],
    ['\\supseteq', 0x2287],
    ['\\differencedelta', 0x2206],
    ['\\mvert', 0x2223],
    ['\\parallel', 0x2225],

    ['\\simeq', 0x2243],
  ],
  'mrel'
);

newSymbols(
  [
    // See http://tex.stackexchange.com/questions/41476/lengths-and-when-to-use-them
    ['\\ ', 0x00a0],
    ['~', 0x00a0],
    ['\\space', 0x00a0],
  ],
  'space'
);

// Punctuation
newSymbols(
  [
    ['\\colon', 0x003a],
    ['\\cdotp', 0x22c5],
    ['\\vdots', 0x22ee, 'mord'],
    ['\\ldotp', 0x002e],
    [',', 0x002c],
    [';', 0x003b],
  ],
  'mpunct'
);
newSymbols(
  [
    ['\\cdots', 0x22ef],
    ['\\ddots', 0x22f1],
    ['\\ldots', 0x2026],
    ['\\mathellipsis', 0x2026],
  ],
  'minner'
);

newSymbols([
  ['\\/', 0x002f],
  ['|', 0x2223, 'mord'],

  ['\\imath', 0x0131],
  ['\\jmath', 0x0237],

  ['\\degree', 0x00b0],

  ["'", 0x2032], // Prime
  ['"', 0x201d], // Double Prime
]);
