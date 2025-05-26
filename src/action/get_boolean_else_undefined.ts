import actionsCore from '@actions/core'

/**
 * Get the boolean value of an input from the action. If the input is not provided, returns undefined.
 * 
 * @returns The boolean value of the input or undefined if not provided.
 */
export function getBooleanElseUndefined(
  key : string,
  getInput : (name : string) => string = actionsCore.getInput
) : boolean | undefined {
  const trueValue = ['true', 'True', 'TRUE'];

  const keyValue = getInput(key);

  if (keyValue === '') {
    return undefined;
  }

  return trueValue.includes(keyValue);
}
