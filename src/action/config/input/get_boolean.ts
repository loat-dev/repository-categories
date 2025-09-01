import actionsCore from '@actions/core'

/**
 * Get the boolean value of an input from the action.
 * 
 * @returns The boolean value of the input or undefined if the value was not set.
 */
export function getBoolean(
  key : string,
  getInput : (name : string) => string = actionsCore.getInput
) : boolean | undefined {
  const trueValue = ['true', 'True', 'TRUE', 'yes', 'Yes', 'YES'];
  const value = getInput(key)

  if (value === '') {
    return undefined;
  }

  return trueValue.includes(value);
}
