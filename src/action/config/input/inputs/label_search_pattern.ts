import * as errors from '../errors/index.ts'
import { getString } from '../get_string.ts';

/**
 * Get the value of the `label-search-pattern` input from the action.
 * 
 * @returns The value of the `label-search-pattern` input or undefined if the value was not set.
 */
export function labelSearchPattern() : RegExp | undefined {
  const key = 'label-search-pattern'
  const inputPattern = getString(key);

  if (inputPattern === undefined) {
    return undefined;
  }

  try {
    return new RegExp(inputPattern, 'g');
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new errors.InputParsingError(key, error)
    }

    throw error
  }
}
