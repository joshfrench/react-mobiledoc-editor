export const LATEST_MOBILEDOC_VERSION = require('mobiledoc-kit/dist/commonjs/mobiledoc-kit/renderers/mobiledoc').MOBILEDOC_VERSION;

export const EMPTY_MOBILEDOC = {
  version: LATEST_MOBILEDOC_VERSION,
  markups: [],
  atoms: [],
  cards: [],
  sections: [
    [1, "p", []]
  ]
};
