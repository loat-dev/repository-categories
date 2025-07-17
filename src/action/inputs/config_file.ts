import { getString } from '../get_string.ts';

/**
 * Get the value of the `config-file` input from the action.
 * 
 * @returns The value of the `config-file` input.
 */
export function configFile() : string | undefined {
  return getString('config-file');
}
