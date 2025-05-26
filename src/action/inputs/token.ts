import actionsCore from '@actions/core';

/**
 * Get the value of the `token` input from the action.
 * 
 * @returns The value of the `token` input.
 */
export function token() : string {
  return actionsCore.getInput(
    'token',
    {required: true}
  );
}
