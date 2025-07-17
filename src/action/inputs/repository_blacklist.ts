import actionsCore from '@actions/core';
import { getString } from '../get_string.ts';
import * as yaml from '@std/yaml';
import { defaults } from '../config/index.ts';

/**
 * Get the value of the `repository-blacklist` input from the action.
 * 
 * @returns The value of the `repository-blacklist` input.
 */
export function repositoryBlacklist() : string[] {
  const value = getString('repository-blacklist');

  try {
    return {
      ...defaults.repositoryBlacklist,
      ...yaml.parse(value) as string[]
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      actionsCore.error(
        `Parsing error:\n${error.stack}`,
        {title: 'Invalid YAML'}
      )
    }

    actionsCore.error(error as Error)

    return defaults.repositoryBlacklist;
  }
}
