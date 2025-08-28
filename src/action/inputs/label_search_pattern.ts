import { getString } from '../get_string.ts';

/**
 * Get the value of the `label-search-pattern` input from the action.
 * 
 * @returns The value of the `label-search-pattern` input.
 */
export function labelSearchPattern() : RegExp {
  const inputPattern = getString('label-search-pattern');

  return new RegExp(inputPattern, 'g');
}
