import { getString } from '../get_string.ts';

/**
 * Get the value of the `token` input from the action.
 * 
 * @returns The value of the `token` input.
 */
export function token() : string {
  return getString('token');
}
