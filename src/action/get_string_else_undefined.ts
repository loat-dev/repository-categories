import actionsCore from '@actions/core'

/**
 * Get the string value of an input from the action. If the input is not provided, returns undefined.
 * 
 * @returns The string value of the input or undefined if not provided.
 */
export function getStringElseUndefined(
  key : string,
  getInput : (name : string) => string = actionsCore.getInput
) : string | undefined {
  const keyValue = getInput(key);

  if (keyValue === '') {
    return undefined;
  }

  return keyValue;
}
