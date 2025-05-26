import { getStringElseUndefined } from '../get_string_else_undefined.ts';
import * as yaml from '@std/yaml';

/**
 * Get the value of the `repository-blacklist` input from the action.
 * 
 * @returns The value of the `repository-blacklist` input.
 */
export function repositoryBlacklist() : string[] {
  const value = getStringElseUndefined('repository-blacklist');

  if (value === undefined) {
    return []
  }
  
  return yaml.parse(value) as string[]
}
