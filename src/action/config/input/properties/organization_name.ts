import * as actionsCore from '@actions/core';
import * as transform from '../../transform/index.ts';


/**
 * Get the value of the `organization-name` input from the action.
 * 
 * @returns The value of the `organization-name` input or undefined if the value was not set.
 */
export function organizationName() : string | undefined {
  return transform.toString(actionsCore.getInput('organization-name'));
}
