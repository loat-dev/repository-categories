import { getStringElseUndefined } from '../get_string_else_undefined.ts';

/**
 * Get the value of the `config-file` input from the action.
 * 
 * @returns The value of the `config-file` input.
 */
export function configFile() : string | undefined {
  return getStringElseUndefined('config-file');
}
