import * as actionsCore from '@actions/core'
import * as transform from '../../transform/index.ts';

/**
 * Get the value of the `token` input from the action.
 * 
 * @returns The value of the `token` input or undefined if the value was not set.
 */
export function token() : string | undefined {
  return transform.toString(actionsCore.getInput('token'));
}
