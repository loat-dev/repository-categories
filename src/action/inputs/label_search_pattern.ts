import { getString } from '../get_string.ts';

/**
 * Get the value of the `label-search-pattern` input from the action.
 * 
 * @returns The value of the `label-search-pattern` input.
 */
export function labelSearchPattern() : string {
  return getString('label-search-pattern');
}
