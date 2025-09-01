import { Categories } from '../../categories.ts';
import { getString } from '../get_string.ts';
import * as yaml from '@std/yaml';
import * as errors from '../errors/index.ts';


/**
 * Get the value of the `categories` input from the action.
 * 
 * @returns The value of the `categories` input.
 */
export function categories() : Categories {
  const key = 'categories';
  const value = getString(key);

  try {
    return yaml.parse(value) as Categories
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new errors.InputParsingError(key, error);
    }

    throw error;
  }
}
