import * as yaml from '@std/yaml';
import * as errors from '../errors/index.ts'
import { getString } from '../get_string.ts';

/**
 * Get the value of the `repository-blacklist` input from the action.
 * 
 * @returns The value of the `repository-blacklist` input.
 */
export function repositoryBlacklist() : string[] {
  const key = 'repository-blacklist'
  const value = getString(key);

  try {
    return yaml.parse(value) as string[]
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new errors.InputParsingError(key, error);
    }

    throw error
  }
}
