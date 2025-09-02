import * as yaml from '@std/yaml';
import * as actionsCore from '@actions/core'
import * as errors from '../../../../errors/index.ts'
import * as transform from '../../transform/index.ts';

/**
 * Get the value of the `repository-blacklist` input from the action.
 * 
 * @returns The value of the `repository-blacklist` input or undefined if the value was not set.
 */
export function repositoryBlacklist() : string[] | undefined {
  const key = 'repository-blacklist'
  const value = transform.toString(actionsCore.getInput(key));

  if (value === undefined) {
    return undefined;
  }

  try {
    return yaml.parse(value) as string[]
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new errors.PropertyParsingError(key, error);
    }

    throw error
  }
}
