import * as yaml from '@std/yaml';
import * as actionsCore from '@actions/core';
import * as errors from '../../../../errors/index.ts';
import * as transform from '../../transform/index.ts';
import { Categories } from '../../categories.ts';

/**
 * Get the value of the `categories` input from the action.
 * 
 * @returns The value of the `categories` input or undefined if the value was not set.
 */
export function categories() : Categories | undefined {
  const key = 'categories';
  const value = transform.toString(actionsCore.getInput(key));

  if (value === undefined) {
    return undefined;
  }

  try {
    return yaml.parse(value) as Categories
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new errors.PropertyParsingError(key, error);
    }

    throw error;
  }
}
