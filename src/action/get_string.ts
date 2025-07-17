import actionsCore from '@actions/core'

/**
 * Get the string value of an input from the action.
 * 
 * @returns The string value of the input.
 */
export function getString(
  key : string,
  getInput : (name : string) => string = actionsCore.getInput
) : string {

  return getInput(key);
}
