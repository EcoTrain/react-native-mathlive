export const LATEX_COMMANDS = {};

/**
 * An argument template has the following syntax:
 *
 * <placeholder>:<type>
 *
 * where
 * - <placeholder> is a string whose value is displayed when the argument
 *   is missing
 * - <type> is one of 'string', 'color', 'dimen', 'auto', 'text', 'math'
 *
 */
function parseParameterTemplateArgument(argTemplate) {
  let type = 'auto';

  // Parse the type (:type)
  const r = argTemplate.match(/:([^=]+)/);
  if (r) {
    type = r[1].trim();
  }

  return type;
}

function parseParameterTemplate(parameterTemplate) {
  if (!parameterTemplate) {
    return [];
  }

  const result = [];
  let parameters = parameterTemplate.split(']');
  if (parameters[0].startsWith('[')) {
    // We found at least one optional parameter.
    result.push({
      isOptional: true,
      type: parseParameterTemplateArgument(parameters[0].slice(1)),
    });
    // Parse the rest
    for (let i = 1; i <= parameters.length; i++) {
      result.push(...parseParameterTemplate(parameters[i]));
    }
  } else {
    parameters = parameterTemplate.split('}');
    if (parameters[0].startsWith('{')) {
      // We found a required parameter
      result.push({
        isOptional: false,
        type: parseParameterTemplateArgument(parameters[0].slice(1)),
      });
      // Parse the rest
      for (let i = 1; i <= parameters.length; i++) {
        result.push(...parseParameterTemplate(parameters[i]));
      }
    }
  }

  return result;
}

/**
 * Define one of more functions.
 *
 * @param names
 * @param parameters The number and type of required and optional parameters.
 * For example: '{}' defines a single mandatory parameter
 * '[string]{auto}' defines two params, one optional, one required
 */
export function defineFunction(names, parameters, options) {
  if (!options) {
    options = {};
  }

  // Set default values of functions
  const data = {
    definitionType: 'function',
    params: parseParameterTemplate(parameters),

    isFunction: options.isFunction ?? false,
    applyMode: options.applyMode,
    createAtom: options.createAtom,
  };
  if (typeof names === 'string') {
    LATEX_COMMANDS['\\' + names] = data;
  } else {
    for (const name of names) {
      LATEX_COMMANDS['\\' + name] = data;
    }
  }
}
