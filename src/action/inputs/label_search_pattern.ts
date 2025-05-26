import { getStringElseUndefined } from '../get_string_else_undefined.ts';

/**
 * Get the value of the `label-search-pattern` input from the action.
 * 
 * @returns The value of the `label-search-pattern` input.
 */
export function labelSearchPattern() : string | undefined {
  return getStringElseUndefined('label-search-pattern');
}
