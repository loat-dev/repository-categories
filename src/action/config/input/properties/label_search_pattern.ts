import * as actionsCore from '@actions/core'
import * as transform from '../../transform/index.ts';

/**
 * Get the value of the `label-search-pattern` input from the action.
 * 
 * @returns The value of the `label-search-pattern` input or undefined if the value was not set.
 */
export function labelSearchPattern() : RegExp | undefined { 
  return transform.toRegExp(actionsCore.getInput('label-search-pattern'));
}
