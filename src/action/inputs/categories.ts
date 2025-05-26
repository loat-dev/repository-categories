import { getStringElseUndefined } from '../get_string_else_undefined.ts';
import * as yaml from '@std/yaml';

interface Categories {
  '' : string,
  [key : string]: string
}

/**
 * Get the value of the `categories` input from the action.
 * 
 * @returns The value of the `categories` input.
 */
export function categories() : Categories {
  const value = getStringElseUndefined('categories');

  if (value === undefined) {
    return {
      '': 'No Category'
    };
  }
  
  return yaml.parse(value) as Categories
}
