import actionsCore from '@actions/core';
import { defaults } from '../config/index.ts';
import { Categories } from '../config/index.ts';
import { getString } from '../get_string.ts';
import * as yaml from '@std/yaml';


/**
 * Get the value of the `categories` input from the action.
 * 
 * @returns The value of the `categories` input.
 */
export function categories() : Categories {
  const value = getString('categories');

  try {
    return {
      ...defaults.categories,
      ...yaml.parse(value) as Categories
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      actionsCore.error(
        `Parsing error:\n${error.stack}`,
        {title: 'Invalid YAML'}
      )
    }

    actionsCore.error(error as Error)

    return defaults.categories;
  }
}
