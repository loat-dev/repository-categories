import * as actionsCore from '@actions/core';
import * as transform from '../../transform/index.ts';

/**
 * Get the value of the `config-file` input from the action.
 * 
 * @returns The value of the `config-file` input or undefined if the value was not set.
 */
export function configFile() : string | undefined {
  return transform.toString(actionsCore.getInput('config-file'));
}
