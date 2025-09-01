import actionsCore from '@actions/core'

/**
 * Get the string value of an input from the action.
 * 
 * @returns The string value of the input or undefined if the value was not set.
 */
export function getString(
  key : string,
  getInput : (name : string) => string = actionsCore.getInput
) : string | undefined {
  const value = getInput(key);

  if (value === '') {
    return undefined;
  }
  
  return value;
}
