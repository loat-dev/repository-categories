import * as yaml from '@std/yaml';
import * as errors from '../errors/index.ts';
import { Categories } from '../../categories.ts';
import { getString } from '../get_string.ts';


/**
 * Get the value of the `categories` input from the action.
 * 
 * @returns The value of the `categories` input or undefined if the value was not set.
 */
export function categories() : Categories | undefined {
  const key = 'categories';
  const value = getString(key);

  if (value === undefined) {
    return undefined;
  }

  try {
    return yaml.parse(value) as Categories
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new errors.InputParsingError(key, error);
    }

    throw error;
  }
}
